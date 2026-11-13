"""rankings.html: the best models, one ranking per opponent, built from the score logs the SteveTheBot scripts write
(logs/yardstick.csv from sim/eval_vs_bot.py; logs/**/*_cpu9_games.csv from run.py --games-log in Dolphin).

Only models saved at the end of their run are ranked. Several score runs of the same model and opponent are pooled
(games added up). Rows are ranked by share of games won, then stock lead (stocks taken minus stocks lost, per
game); rankings in BY_LEAD, where most models win nearly every game, go by stock lead first.
"""
import csv
import html
import math
import time
from collections import defaultdict

from names import end_of_run, explain, show

# (id, title, what it is, source, games needed, open by default)
BOARDS = [
    ('cpu9', 'In-game CPU, level 9 (Dolphin)',
     'The real game in Slippi Dolphin against Melee\'s own hardest computer player. The most trustworthy test, but '
     'slow, so only some models have played it. The better models win nearly every game, so this ranking goes by '
     'stock lead.', 'dolphin', 20, True),
    ('t21', 'Frozen T21L6Cs4 (simulator)',
     'A saved copy of T21L6Cs4, the strongest model of its time, that does not learn. The hardest opponent '
     'the newer models are scored against; T21L6Cs4 itself is the reference and is not ranked.',
     'model_T21L6Cs4_c04_seeds1000', 50, True),
    ('ppo8', 'Frozen PPO8Self (simulator)',
     'A saved copy of PPO8Self that does not learn. The yardstick for the older models; the newer ones beat it '
     'almost every game, so it no longer tells them apart.', 'model_PPO8Self_c04_seeds1000', 50, False),
    ('bot9', 'Scripted bot, level 9 (simulator)',
     'A hand-written Falcon. Most trained models since PPO beat it nearly every game, so this ranking goes by '
     'stock lead.',
     'scripted_bot_level9_seeds1000', 50, False),
]
BY_LEAD = {'cpu9', 'bot9'}   # saturated on wins: ranked by stock lead first


def _sim_scores(src):
    """{yardstick: {model: [games, won, taken, lost, first day]}} from logs/yardstick.csv."""
    out = defaultdict(lambda: defaultdict(lambda: [0, 0, 0.0, 0.0, '9999']))
    path = src / 'logs' / 'yardstick.csv'
    if not path.is_file():
        return out
    for r in csv.DictReader(path.open(encoding='utf-8')):
        g = int(r['games'])
        s = out[r['yardstick']][r['model']]
        s[0] += g
        s[1] += int(r['won'])
        s[2] += float(r['taken_per_game']) * g
        s[3] += float(r['lost_per_game']) * g
        s[4] = min(s[4], r['time'][:10])
    return out


def _dolphin_scores(src):
    """{model: [games, won, taken, lost, first day]} from every *_cpu9_games.csv under logs/."""
    out = defaultdict(lambda: [0, 0, 0.0, 0.0, '9999'])
    for p in sorted((src / 'logs').rglob('*_cpu9_games.csv')):
        for r in csv.DictReader(p.open(encoding='utf-8')):
            if r.get('cpu_level') != '9':
                continue
            s = out[r['model']]
            s[0] += 1
            s[1] += int(r['won'])
            s[2] += float(r['stocks_taken'])
            s[3] += float(r['stocks_lost'])
            s[4] = min(s[4], r['time'][:10])
    return out


def _table(rows, best_note):
    body = []
    for i, (name, g, won, lead, day) in enumerate(rows):
        pct = 100.0 * won / g
        body.append('<tr%s><td class="n">%d</td><td><a href="#m-%s">%s</a></td><td class="n">%d%%</td>'
                    '<td class="n">%+.2f</td><td class="n">%d</td><td class="d">%s</td></tr>' % (
                        ' class="top"' if i == 0 else '', i + 1, html.escape(name), html.escape(name), round(pct),
                        lead, g, time.strftime('%d %b', time.strptime(day, '%Y-%m-%d'))))
    return ('<div class="tw"><table><thead><tr><th class="n">#</th><th>Model</th><th class="n">Won</th>'
            '<th class="n">Stock lead</th><th class="n">Games</th><th class="d">First scored</th></tr></thead>'
            '<tbody>%s</tbody></table></div><p class="small">%s</p>' % (''.join(body), best_note))


def _uncertainty(games):
    """Rough size of chance in a win share over this many games (one standard error at 50%), in points."""
    return round(100 * math.sqrt(0.25 / games))


STYLE = """
.tw{overflow-x:auto;margin-top:8px;background:var(--surface);border:1px solid var(--line);border-radius:6px}
table{border-collapse:collapse;width:100%;font-size:.92rem;font-variant-numeric:tabular-nums}
th,td{padding:7px 10px;text-align:left;border-top:1px solid var(--line);white-space:nowrap}
thead th{border-top:0;color:var(--muted);font-weight:600;font-size:.82rem}
td.n,th.n{text-align:right} td.d,th.d{color:var(--muted)}
tr.top td{font-weight:700}
.small{font-size:.85rem;margin-top:6px}
.best{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(220px,100%),1fr));gap:10px;margin-top:8px}
.best a{display:block;background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:12px 14px;
  text-decoration:none;color:var(--ink)}
.best b{display:block;font-size:1.15rem;color:var(--accent)}
.best span{display:block;color:var(--muted);font-size:.85rem}
.legend li{display:block;scroll-margin-top:60px}
.legend b{display:block}
.legend span{display:block;color:var(--muted);font-size:.9rem}
details>summary{cursor:pointer}
details.board>summary h2{display:inline}
"""


def build(here, src, head, site_style):
    """Write rankings.html; return the raw model names it shows (for the name check)."""
    sim, dol = _sim_scores(src), _dolphin_scores(src)
    shown, sections, best = set(), [], []
    for bid, title, about, source, need, open_ in BOARDS:
        scores = dol if source == 'dolphin' else sim.get(source, {})
        rows = []
        for model, (g, won, taken, lost, day) in scores.items():
            if g < need or not end_of_run(model) or (bid == 't21' and show(model) == 'T21L6Cs4'):
                continue
            shown.add(model)
            rows.append((show(model), g, won, (taken - lost) / g, day))
        if not rows:
            continue
        if bid in BY_LEAD:
            rows.sort(key=lambda r: (-r[3], -r[2] / r[1], r[0]))
        else:
            rows.sort(key=lambda r: (-r[2] / r[1], -r[3], r[0]))
        g_typ = sorted(r[1] for r in rows)[len(rows) // 2]
        note = ('With %d games, chance alone moves a win share by about %d points (one standard error), so models '
                'a few places apart may be equally strong. Stock lead: stocks taken minus stocks lost, per game.'
                % (g_typ, _uncertainty(g_typ)))
        best.append('<a href="#%s"><span>%s</span><b>%s</b><span>won %d%%, stock lead %+.2f</span></a>' % (
            bid, html.escape(title), html.escape(rows[0][0]), round(100 * rows[0][2] / rows[0][1]), rows[0][3]))
        sections.append('<details class="board" id="%s"%s><summary><h2>%s</h2></summary><p>%s</p>%s</details>' % (
            bid, ' open' if open_ else '', html.escape(title), html.escape(about), _table(rows, note)))
    legend = ''.join('<li id="m-%s"><b>%s</b><span>%s</span></li>' % (
        html.escape(n), html.escape(n), html.escape(explain(n) or '')) for n in
        sorted({show(m) for m in shown}, key=lambda n: (n == 'random', n.lower())))
    page = head.replace('</head>', '<title>SteveTheBot rankings</title><style>%s%s</style></head>' % (
        site_style, STYLE)) + """<main>
<header><h1>Rankings</h1>
<p>The best models so far, one ranking per opponent. Each model plays the same games (fixed seeds) against the same
opponent. Only the copy saved at the end of each training run is ranked. Built from the score logs; rebuilt %s.</p>
</header>
<section><h2>Best against each opponent</h2><div class="best">%s</div></section>
%s
<section id="names"><h2>The models in these rankings</h2><ul class="legend">%s</ul></section>
</main></body></html>
""" % (time.strftime('%d %b %Y'), ''.join(best), '\n'.join(sections), legend)
    (here / 'rankings.html').write_text(page, encoding='utf-8')
    return shown
