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
    ('t4v2', 'Frozen T4V2, four seeds (simulator)',
     'The four T4V2 runs (seeds 3 to 6), saved and not learning; 100 games against each, pooled. They play with the '
     'current controls (a decision every frame, acting on what it saw 11 frames earlier, like a human reaction), so '
     'this is the yardstick for models with those controls: they win almost nothing against frozen T21L6Cs4, which '
     'reacts without delay. The T4V2 runs themselves are the opponent and are not ranked.',
     ['model_T4V2s%d_c04_seeds1000' % s for s in (3, 4, 5, 6)], 400, True),
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


def _links(pages, short):
    """Links to a model's scenario and game-report pages; pages: [(href, short text, long text)]."""
    return ' '.join('<a class="pg" href="%s">%s</a>' % (html.escape(h), html.escape(s if short else l))
                    for h, s, l in pages)


def _table(rows, best_note, pages):
    body = []
    for i, (name, g, won, lead, day) in enumerate(rows):
        pct = 100.0 * won / g
        body.append('<tr%s><td class="n">%d</td><td><a href="#m-%s">%s</a></td><td class="n">%d%%</td>'
                    '<td class="n">%+.2f</td><td class="n">%d</td><td class="d">%s</td><td>%s</td></tr>' % (
                        ' class="top"' if i == 0 else '', i + 1, html.escape(name), html.escape(name), round(pct),
                        lead, g, time.strftime('%d %b', time.strptime(day, '%Y-%m-%d')),
                        _links(pages.get(name, []), True)))
    return ('<div class="tw"><table><thead><tr><th class="n">#</th><th>Model</th><th class="n">Won</th>'
            '<th class="n">Stock lead</th><th class="n">Games</th><th class="d">First scored</th>'
            '<th>Watch</th></tr></thead>'
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
a.pg{display:inline-block;font-size:.8rem;padding:1px 7px;margin:1px 2px 1px 0;border:1px solid var(--line);
  border-radius:10px;text-decoration:none;font-weight:400}
.legend .pages{margin-top:3px}
details>summary{cursor:pointer}
details.board>summary h2{display:inline}
"""


def _head_to_head(src):
    """Every score of one model against another frozen model that is not a ranking opponent above, newest first:
    (html section, raw model names shown)."""
    boards = set()
    for b in BOARDS:
        boards.update([b[3]] if isinstance(b[3], str) else b[3])
    path = src / 'logs' / 'yardstick.csv'
    if not path.is_file():
        return '', set()
    rows, shown = [], set()
    for r in csv.DictReader(path.open(encoding='utf-8')):
        y = r['yardstick']
        if not y.startswith('model_') or y in boards:
            continue
        opp = y[len('model_'):-len('_seeds1000')] if y.endswith('_seeds1000') else y[len('model_'):]
        shown.update([r['model'], opp])
        rows.append((r['time'], r['model'], opp, int(r['games']), int(r['won']),
                     float(r['taken_per_game']) - float(r['lost_per_game'])))
    if not rows:
        return '', set()
    rows.sort(key=lambda r: r[0], reverse=True)
    body = ''.join('<tr><td class="d">%s</td><td><a href="#m-%s">%s</a></td><td><a href="#m-%s">%s</a></td>'
                   '<td class="n">%d%%</td><td class="n">%+.2f</td><td class="n">%d</td></tr>' % (
                       time.strftime('%d %b', time.strptime(t[:10], '%Y-%m-%d')), html.escape(show(m)),
                       html.escape(show(m)), html.escape(show(o)), html.escape(show(o)), round(100.0 * w / g), lead, g)
                   for t, m, o, g, w, lead in rows)
    return ('<details class="board" id="h2h" open><summary><h2>Head to head</h2></summary><p>One model against '
            'another, frozen, outside the rankings above: comparisons inside one experiment (a variant against its '
            'baseline, a long run against its own half-way copy). Newest first. Won: share of games the first model '
            'won. The <a href="experiments.html">experiments page</a> groups these by experiment.</p>'
            '<div class="tw"><table><thead><tr><th class="d">Scored</th><th>Model</th><th>Against</th>'
            '<th class="n">Won</th><th class="n">Stock lead</th><th class="n">Games</th></tr></thead><tbody>%s'
            '</tbody></table></div></details>' % body), shown


def build(here, src, head, site_style, pages=None):
    """Write rankings.html; return the raw model names it shows (for the name check). pages: {shown name: [(href,
    short text, long text)]}, the model's scenario and game-report pages, linked from its row and legend entry."""
    pages = pages or {}
    sim, dol = _sim_scores(src), _dolphin_scores(src)
    shown, sections, best = set(), [], []
    for bid, title, about, source, need, open_ in BOARDS:
        opponents = set()
        if source == 'dolphin':
            scores = dol
        else:
            sources = [source] if isinstance(source, str) else source
            scores = defaultdict(lambda: [0, 0, 0.0, 0.0, '9999'])
            for y in sources:
                for model, s in sim.get(y, {}).items():
                    t = scores[model]
                    t[:4] = [a + b for a, b in zip(t[:4], s[:4])]
                    t[4] = min(t[4], s[4])
            opponents = {y[len('model_'):-len('_seeds1000')] for y in sources if y.startswith('model_')}
        rows = []
        for model, (g, won, taken, lost, day) in scores.items():
            if g < need or not end_of_run(model) or model in opponents:
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
            bid, ' open' if open_ else '', html.escape(title), html.escape(about), _table(rows, note, pages)))
    h2h, h2h_shown = _head_to_head(src)
    shown |= h2h_shown
    legend = ''.join('<li id="m-%s"><b>%s</b><span>%s</span>%s</li>' % (
        html.escape(n), html.escape(n), html.escape(explain(n) or ''),
        '<div class="pages">%s</div>' % _links(pages[n], False) if pages.get(n) else '') for n in
        sorted({show(m) for m in shown}, key=lambda n: (n == 'random', n.lower())))
    page = head.replace('</head>', '<title>SteveTheBot rankings</title><style>%s%s</style></head>' % (
        site_style, STYLE)) + """<main>
<header><h1>Rankings</h1>
<p>The best models so far, one ranking per opponent. Each model plays the same games (fixed seeds) against the same
opponent. Only the copy saved at the end of each training run is ranked. Built from the score logs; rebuilt %s.
The Watch column links the model's scenario playback (edgeguard, recovery and the rest) and whole-game reports,
where they exist. To compare one model per change across every yardstick, see
<a href="catalog.html">How the bot got here</a>.</p>
</header>
<section><h2>Best against each opponent</h2><div class="best">%s</div></section>
%s
%s
<section id="names"><h2>The models in these rankings</h2><ul class="legend">%s</ul></section>
</main></body></html>
""" % (time.strftime('%d %b %Y'), ''.join(best), '\n'.join(sections), h2h, legend)
    (here / 'rankings.html').write_text(page, encoding='utf-8')
    return shown
