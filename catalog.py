"""catalog.html: one model per change made to the bot, in the order the changes were made, each scored on every
yardstick: the level 9 CPU in Dolphin, frozen T21L6Cs4 and the level 9 scripted bot (simulator), and the version 2
scenarios against frozen T21L6Cs4. Built from the SteveTheBot score logs (logs/yardstick.csv,
logs/**/*_cpu9_games.csv, logs/scenario.csv); a blank cell means that score has not been run.
"""
import csv
import html
import time
from collections import defaultdict

from names import show
from rankings import _dolphin_scores, _links, _sim_scores

# (raw model name, change, what the change was)
CATALOG = [
    ('random', 'Nothing learned', 'Presses one of the 54 actions at random every decision: the floor.'),
    ('SimBase_c08', 'The 2017 learner', 'The original 2017 actor-critic, unchanged, trained 48,000 updates in the '
     'simulator against itself.'),
    ('PPOSelf_c04', 'PPO', 'The learning method replaced by PPO with GAE (64 matches at once), same network; '
     'trained against itself.'),
    ('PPOBot_c04', 'PPO, against the scripted bot', 'As PPOSelf, but trained against the hand-written scripted '
     'bot instead of itself.'),
    ('PPO8Self_c04', 'Network fixes', 'PPO with four network fixes (activation, critic output, initialisation, '
     'Adam with gradient clipping); trained against itself.'),
    ('PPO8Bot_c04', 'Network fixes, against the scripted bot', 'As PPO8Self, trained against the scripted bot.'),
    ('PPO8Bot_c04_edit_rec', 'Hand-edited weights', 'PPO8Bot with its choices sharpened by hand and a wired-in '
     'recovery circuit; no training.'),
    ('T9Prev', 'Own last action as input', 'The bot also sees the action it chose last time (optional, not the '
     'default).'),
    ('T22EmbSmall3_c04', 'Animation embedding', 'Each animation becomes 32 learned numbers instead of one of 384 '
     'switches (tried as default, then dropped).'),
    ('T21L6Cs4_c04', 'Twice the learning rate', 'Learning rate 0.0006 held constant instead of 0.0003 lowered to '
     'zero: the biggest single gain. The reference opponent for the scores below.'),
    ('T22LongBase7_c08', 'Twice as long', 'The T21L6Cs4 settings trained for 5,880 updates instead of 2,940.'),
    ('T16F1D15s3_c04', 'Every frame, human reaction delay', 'A decision every frame instead of every 2, acting on '
     'what it saw 15 frames ago (a human-like delay); far weaker at this training length.'),
    ('T17F54s4_c04', 'Every frame, 11-frame delay', 'The delay set to 11 frames (0.19 s), the current default '
     'controls.'),
    ('T4V2s3_c04', 'Input version 2', 'Inputs rebuilt from what both the simulator and human replays record, the '
     'groundwork for learning from replays.'),
    ('T4HumP1_c04', 'Start from human replays', 'First copies 1,236 human Falcon ditto replays (imitation), then '
     'trains against itself with PPO from that start; the best delayed model against the in-game CPU.'),
]

REF = 'T21L6Cs4_c04'
# (column, metric in logs/scenario.csv, what it measures)
SCEN = [
    ('Edgeguard', 'edgeguard v2', 'opponent offstage: share of starts where the model takes the stock'),
    ('Recovery', 'recovery v2', 'model offstage: share of starts where it gets back and can act'),
    ('Follow-up', 'follow-up v2 one more hit', 'after landing a hit: share with at least one more hit'),
    ('Whiff punish', 'whiff punish', 'opponent missed a move nearby: share the model punishes'),
    ('First hit', 'first hit by the model', 'from neutral: share where the model lands the first hit'),
    ('Shielding', 'shield: not hit', 'a move coming at the model: share where it is not hit'),
]


def _scenarios(src):
    """{(model, metric): mean value of the model's latest run against frozen T21L6Cs4}."""
    rows = defaultdict(list)
    path = src / 'logs' / 'scenario.csv'
    if path.is_file():
        for r in csv.DictReader(path.open(encoding='utf-8')):
            if r['opponent'] == REF:
                rows[(r['model'], r['metric'])].append((r['time'], float(r['value'])))
    out = {}
    for key, vals in rows.items():
        last = max(t for t, _ in vals)
        v = [x for t, x in vals if t == last]
        out[key] = sum(v) / len(v)
    return out


def _score_cell(s, ref=False):
    if ref:
        return '<td class="n d" title="This is the opponent">ref.</td>'
    if not s:
        return '<td class="n d">&ndash;</td>'
    g, won, taken, lost, _day = s
    return '<td class="n" title="%d games, stock lead %+.2f a game">%d%%</td>' % (g, (taken - lost) / g,
                                                                               round(100.0 * won / g))


STYLE = """
main{max-width:1100px}
.tw{overflow-x:auto;margin-top:8px;background:var(--surface);border:1px solid var(--line);border-radius:6px}
table{border-collapse:collapse;width:100%;font-size:.9rem;font-variant-numeric:tabular-nums}
th,td{padding:7px 9px;text-align:left;border-top:1px solid var(--line);vertical-align:top}
thead th{border-top:0;color:var(--muted);font-weight:600;font-size:.8rem;white-space:nowrap}
thead tr.grp th{text-align:center;border-bottom:1px solid var(--line)}
td.n,th.n{text-align:right;white-space:nowrap} td.d{color:var(--muted)}
td.m{white-space:nowrap} td.m b{display:block} td.m span{color:var(--muted);font-size:.82rem}
td.what{min-width:220px;max-width:340px;color:var(--muted);font-size:.85rem}
td.sep,th.sep{border-left:1px solid var(--line)}
a.pg{display:inline-block;font-size:.8rem;padding:1px 7px;margin:1px 2px 1px 0;border:1px solid var(--line);
  border-radius:10px;text-decoration:none;white-space:nowrap}
.small{font-size:.85rem;margin-top:6px}
dl.cols{display:grid;grid-template-columns:max-content 1fr;gap:4px 14px;font-size:.9rem}
dl.cols dt{font-weight:600} dl.cols dd{margin:0;color:var(--muted)}
"""


def build(here, src, head, site_style, pages):
    """Write catalog.html; return the raw model names it shows (for the name check)."""
    sim, dol, scen = _sim_scores(src), _dolphin_scores(src), _scenarios(src)
    t21 = sim.get('model_T21L6Cs4_c04_seeds1000', {})
    bot9 = sim.get('scripted_bot_level9_seeds1000', {})
    body = []
    for i, (model, change, what) in enumerate(CATALOG):
        name = show(model)
        cells = [_score_cell(dol.get(model) if dol.get(model, [0])[0] else None),
                 _score_cell(t21.get(model), ref=(model == REF)), _score_cell(bot9.get(model))]
        for _col, metric, _about in SCEN:
            v = scen.get((model, metric))
            cells.append('<td class="n%s">%s</td>' % (' d' if v is None else '',
                                                      '&ndash;' if v is None else '%d%%' % round(v)))
        cells[0] = cells[0].replace('<td class="n', '<td class="sep n', 1)
        cells[3] = cells[3].replace('<td class="n', '<td class="sep n', 1)
        body.append('<tr><td class="n d">%d</td><td class="m"><b>%s</b><span>%s</span></td><td class="what">%s</td>%s'
                    '<td class="sep">%s</td></tr>' % (
                        i + 1, html.escape(change), html.escape(name), html.escape(what), ''.join(cells),
                        _links(pages.get(name, []), True) or '<span class="d">&ndash;</span>'))
    scen_heads = ''.join('<th class="n%s" title="%s">%s</th>' % (' sep' if k == 0 else '', html.escape(a),
                                                                 html.escape(c)) for k, (c, _m, a) in enumerate(SCEN))
    cols = ''.join('<dt>%s</dt><dd>%s.</dd>' % (html.escape(c), html.escape(a[0].upper() + a[1:]))
                   for c, _m, a in SCEN)
    page = head.replace('</head>', '<title>SteveTheBot model catalog</title><style>%s%s</style></head>' % (
        site_style, STYLE)) + """<main>
<header><h1>How the bot got here</h1>
<p>One model for each change made to the bot, in the order the changes were made, scored the same way. Earlier
models were trained before later yardsticks existed; where a score has not been run the cell shows a dash. Hover a
win share for the games played and the stock lead. Rebuilt %s. The per-opponent leaderboards are on the
<a href="rankings.html">rankings page</a>.</p></header>
<section><div class="tw"><table>
<thead><tr class="grp"><th colspan="3"></th><th colspan="3" class="sep">Games won against</th>
<th colspan="%d" class="sep">Scenarios against frozen T21L6Cs4</th><th class="sep"></th></tr>
<tr><th class="n">#</th><th>Change (model)</th><th>What changed</th><th class="n sep">CPU level 9</th>
<th class="n">Frozen T21L6Cs4</th><th class="n">Scripted bot 9</th>%s<th class="sep">Watch</th></tr></thead>
<tbody>%s</tbody></table></div>
<p class="small">CPU level 9: Melee's own hardest computer player, in Slippi Dolphin (20 to 100 games). Frozen
T21L6Cs4 and scripted bot level 9: 100 games each in the simulator. Scenarios: the same saved positions for every
model, 2 repeats. One number can move by about 5 points by chance alone. Models that act every frame with a reaction
delay (rows 12 on) score near zero against undelayed models at the usual training length. In the scenarios they
start each position with nothing in their delay queue, so they stand still for the first 11 to 15 frames: an attack
already 8 or 9 frames away (Shielding) always lands, and their scenario numbers are not directly comparable with the
rows above them.</p></section>
<section><h2>The scenario columns</h2><dl class="cols">%s</dl></section>
</main></body></html>
""" % (time.strftime('%d %b %Y'), len(SCEN), scen_heads, '\n'.join(body), cols)
    (here / 'catalog.html').write_text(page, encoding='utf-8')
    return {m for m, _c, _w in CATALOG}
