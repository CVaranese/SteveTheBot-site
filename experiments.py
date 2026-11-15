"""experiments.html: every experiment, newest first, with its question, variants, scores, verdict and the decision it
fed.

Each entry is a record header in the main repo's notes/experiments/<date>-<slug>.md (front matter, read by
records.py; the fields are listed there and a template is in STYLE.md). The score tables are filled from the score
logs at build time (logs/yardstick.csv from sim/eval_vs_bot.py; logs/**/*_cpu9_games.csv from run.py --games-log),
so new scores of a listed model show up on the next build. No table is typed by hand except 'facts', for numbers the
score logs do not hold.

The build stops when a score log holds a model no record lists (every end-of-run model, by its shown name), or a
task number no record covers. So every finished task writes its record header (rule in STYLE.md, "Experiments").
A facts row whose first word is a watch model's shown name gets that model's links in a Watch column.
"""
import csv
import html
import re
import time
from collections import defaultdict

import names
import records
from names import end_of_run, show
from rankings import _dolphin_scores, _links, _sim_scores

T4V2 = ['model_T4V2s%d_c04_seeds1000' % s for s in (3, 4, 5, 6)]
# The frozen pool, version 2 (the main repo's sim/pools.py is the definition; a new version gets a new key here)
POOL2 = ['model_%s_seeds1000' % m for m in ('T4V2s3_c04', 'T4HumP1', 'T43Lad_c12', 'T43Lad_c48')]

# column key -> (header, what it is, score source: 'dolphin' or [yardsticks in logs/yardstick.csv])
OPP = {
    'cpu9': ('CPU 9, Dolphin', 'Melee\'s own level 9 computer player in Slippi Dolphin (the real game)', 'dolphin'),
    't4v2': ('Frozen T4V2 (4 seeds)', 'The four T4V2 runs, frozen; 100 games against each, pooled. The yardstick for '
             'models with the current controls (every frame, 11-frame reaction delay) until 15 Nov 2026', T4V2),
    'pool2': ('Frozen pool 2', 'The routine yardstick since 15 Nov 2026, four saved models of rising strength: '
              'T4V2s3 (kept from the old pool), T4HumP1 (started from human replays), and the ladder run T43Lad '
              'at a quarter and at the end of its 12-times-length training; 50 games against each, pooled', POOL2),
    't21': ('Frozen T21L6Cs4', 'T21L6Cs4 frozen: the strongest model without reaction delay',
            ['model_T21L6Cs4_c04_seeds1000']),
    'ppo8': ('Frozen PPO8Self', 'PPO8Self frozen: the yardstick of the early PPO models',
             ['model_PPO8Self_c04_seeds1000']),
    'bot9': ('Scripted bot 9', 'The hand-written Falcon at level 9', ['scripted_bot_level9_seeds1000']),
    'bot3': ('Scripted bot 3', 'The hand-written Falcon at level 3', ['scripted_bot_level3_seeds1000']),
}

# what was being tested: (key, heading, what belongs here), in page order
TOPICS = [
    ('replays', 'Learning from human replays', 'Copying human Falcon games (imitation), then PPO from that start.'),
    ('method', 'Learning method and training settings', 'The learner itself: the 2017 baseline, PPO, learning rate, '
     'run length, edits to a trained network.'),
    ('inputs', 'What the network sees (inputs)', 'Changes to the numbers the network is given each frame.'),
    ('controls', 'Controller and timing', 'How often the bot acts, its reaction delay, and its buttons.'),
    ('yardsticks', 'Yardsticks and analysis tools', 'How the bot is measured: scenario tests and the game report.'),
    ('speed', 'Simulator, Dolphin and speed', 'Whether the simulator matches the real game, and how fast runs go.'),
    ('pplus', 'Project+', 'The target game: running it and playing it with a Melee model.'),
]
RECENT = 6                                            # entries in "Recent experiments"
EVAL_COLS = ['cpu9', 'pool2', 't4v2', 't21', 'ppo8', 'bot9']   # score columns of the evaluations table

# Filled by load(src) from the record headers of the main repo's notes/experiments/*.md (records.py).
EXPERIMENTS = []


def load(src):
    """Read the records; a model with no names.py entry is explained by its variant's label. Call before any page
    checks names (build.py does it first)."""
    EXPERIMENTS[:] = records.load(src)
    for e in EXPERIMENTS:
        for what, models in e['variants']:
            for m in models:
                n = show(m)
                if not names.explain(n):
                    names.EXTRA[n] = '%s (experiment "%s").' % (re.sub(r' \(reference[^)]*\)', '', what),
                                                                 e['title'])
    return EXPERIMENTS


def _yard(m, seeds):
    return 'model_%s_seeds%d' % (m, seeds)


def _opp_name(y):
    """'model_X_seedsN' -> 'X'; None for other yardsticks."""
    m = re.fullmatch(r'model_(.+)_seeds\d+', y)
    return m[1] if m else None


def _sim_by_assessment(src):
    """{assessment id: {yardstick: {model: [games, won, taken, lost]}}} from logs/yardstick.csv rows that carry
    an assessment id (column added 2026-11-15)."""
    out = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: [0, 0, 0.0, 0.0, '9999'])))
    path = src / 'logs' / 'yardstick.csv'
    if path.is_file():
        for r in csv.DictReader(path.open(encoding='utf-8')):
            a = r.get('assessment') or ''
            if not a:
                continue
            g = int(r['games'])
            s = out[a][r['yardstick']][r['model']]
            s[0] += g
            s[1] += int(r['won'])
            s[2] += float(r['taken_per_game']) * g
            s[3] += float(r['lost_per_game']) * g
    return out

STYLE = """
main{max-width:1000px}
main>*,article{min-width:0;max-width:100%}
td.v{min-width:170px}
.toc{columns:2 280px;column-gap:24px;margin-top:8px;padding:10px 14px;background:var(--surface);
  border:1px solid var(--line);border-radius:6px;list-style:none}
.toc li{display:block;padding:3px 0;border:0;break-inside:avoid}
.toc span{color:var(--muted);font-size:.82rem;margin-right:6px;font-variant-numeric:tabular-nums}
article{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px;scroll-margin-top:60px}
article h2{font-size:1.15rem;margin:2px 0 6px}
article .meta{color:var(--muted);font-size:.85rem}
article .meta b{color:var(--accent);font-weight:700}
article .q{color:var(--ink);font-style:italic}
article dl{margin:12px 0 0;display:grid;grid-template-columns:max-content 1fr;gap:6px 14px;font-size:.93rem}
article dt{font-weight:600} article dd{margin:0;color:var(--muted)}
@media (max-width:560px){article dl{grid-template-columns:1fr} article dd{margin-bottom:6px}}
.tw{overflow-x:auto;margin-top:10px;border:1px solid var(--line);border-radius:6px}
table{border-collapse:collapse;width:100%;font-size:.88rem;font-variant-numeric:tabular-nums}
th,td{padding:6px 9px;text-align:left;border-top:1px solid var(--line);vertical-align:top}
thead th{border-top:0;color:var(--muted);font-weight:600;font-size:.8rem}
td.n,th.n{text-align:right;white-space:nowrap}
td.n small{display:block;color:var(--muted);font-size:.75rem;font-weight:400}
td.d{color:var(--muted)}
td.v b{display:block;font-weight:600}
td.v span{color:var(--muted);font-size:.8rem}
a.pg{display:inline-block;font-size:.75rem;padding:0 6px;margin:2px 2px 0 0;border:1px solid var(--line);
  border-radius:10px;text-decoration:none}
.small{font-size:.85rem;margin-top:6px}
.cols{font-size:.88rem}
.cols dt{font-weight:600}
.jump{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.jump a{padding:5px 12px;border:1px solid var(--line);border-radius:16px;background:var(--surface);
  text-decoration:none;font-size:.9rem;font-weight:600}
main>section{scroll-margin-top:60px}
.when{color:var(--muted);font-size:.8rem;font-variant-numeric:tabular-nums;white-space:nowrap}
.chip{display:inline-block;font-size:.72rem;padding:0 8px;border:1px solid var(--line);border-radius:10px;
  color:var(--muted);white-space:nowrap;text-decoration:none}
.recent{list-style:none;margin:8px 0 0;padding:0;background:var(--surface);border:1px solid var(--line);
  border-radius:8px}
.recent li{display:block;padding:10px 14px}
.recent li a.t{font-weight:600;text-decoration:none;margin:0 6px}
.recent li p{font-size:.9rem;margin-top:2px}
.topic{margin-top:18px;scroll-margin-top:60px}
.topic h3{font-size:1rem;margin:0}
.topic h3 span{color:var(--muted);font-weight:400;font-size:.85rem;margin-left:4px}
details.x{margin-top:8px;background:var(--surface);border:1px solid var(--line);border-radius:8px;
  scroll-margin-top:60px}
details.x>summary{padding:10px 14px;color:var(--ink);font-size:.95rem;cursor:pointer}
details.x>summary b{margin:0 6px}
details.x>summary .short{display:block;color:var(--muted);font-size:.88rem;margin:2px 0 0 1.1em}
details.x[open]>summary{border-bottom:1px solid var(--line)}
.xb{padding:12px 14px 14px}
.xb .q{color:var(--ink);font-style:italic}
.xb dl{margin:12px 0 0;display:grid;grid-template-columns:max-content 1fr;gap:6px 14px;font-size:.93rem}
.xb dt{font-weight:600} .xb dd{margin:0;color:var(--muted)}
@media (max-width:560px){.xb dl{grid-template-columns:1fr} .xb dd{margin-bottom:6px}}
.evbar{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin-top:10px;font-size:.9rem}
.evbar input[type=search],.evbar select{font:inherit;font-size:.9rem;padding:5px 9px;border:1px solid var(--line);
  border-radius:6px;background:var(--surface);color:var(--ink);max-width:100%}
.evbar label{color:var(--muted);white-space:nowrap}
#ev-n{color:var(--muted);font-size:.85rem}
#evals{background:var(--surface)}
#evals th[data-c]{cursor:pointer;text-decoration:underline dotted}
#evals th.on{color:var(--accent)}
#evals th.on::after{content:' \\25BE'}
#evals td.v{min-width:200px}
#evals td.v a.x{font-size:.8rem}
#evals td.w{min-width:120px}
"""


def _src_rows(col, sim, dol):
    """The score rows a column reads: {model: [games, won, taken, lost, day]} per source, as a list."""
    if isinstance(col, tuple):
        seeds = col[2] if len(col) > 2 else 1000
        return [sim.get(_yard(m, seeds), {}) for m in col[1]], {m for m in col[1]}
    source = OPP[col][2]
    if source == 'dolphin':
        return [dol], set()
    return [sim.get(y, {}) for y in source], {_opp_name(y) for y in source if _opp_name(y)}


def _cell(models, col, sim, dol):
    srcs, opps = _src_rows(col, sim, dol)
    if all(m in opps for m in models):
        return '<td class="n d" title="These models are the opponent">ref.</td>'
    per = []
    for m in models:
        s = [0, 0, 0.0, 0.0]
        for i, rows in enumerate(srcs):
            r = rows.get(m)
            if r and r[0]:
                for k in range(4):
                    s[k] += r[k]
        per.append((m, s))
    played = [(m, s) for m, s in per if s[0]]
    if not played:
        return '<td class="n d">&ndash;</td>'
    g = sum(s[0] for _, s in played)
    won = sum(s[1] for _, s in played)
    lead = (sum(s[2] for _, s in played) - sum(s[3] for _, s in played)) / g
    tip = '; '.join('%s: %d%% of %d games' % (show(m), round(100.0 * s[1] / s[0]), s[0]) for m, s in played)
    if len(played) < len(models):
        tip += '; not scored: ' + ', '.join(show(m) for m, s in per if not s[0])
    runs = ' &middot; '.join('%d' % round(100.0 * s[1] / s[0]) for _, s in played) if len(played) > 1 else ''
    return '<td class="n" title="%s. Stock lead %+.2f a game.">%d%%%s</td>' % (
        html.escape(tip), lead, round(100.0 * won / g), '<small>%s</small>' % runs if runs else '')


def _head(col):
    if isinstance(col, tuple):
        seeds = col[2] if len(col) > 2 else 1000
        return '<th class="n" title="Head to head: games won against %s%s">%s</th>' % (
            html.escape(', '.join(show(m) for m in col[1])),
            '' if seeds == 1000 else ' (games with seed base %d, not the usual 1000)' % seeds, html.escape(col[0]))
    return '<th class="n" title="%s">%s</th>' % (html.escape(OPP[col][1]), html.escape(OPP[col][0]))


def _table(e, sim, dol, pages):
    if not e['variants'] or not e['cols']:
        return ''
    rows = []
    for what, models in e['variants']:
        names = []
        for m in models:
            n = show(m)
            if n not in names:
                names.append(n)
        # a re-score names saved copies whose shown name is the run's: its page is another copy, so no link
        links = '' if e.get('rescore') else ''.join(_links(pages.get(n, []), True) for n in names)
        rows.append('<tr><td class="v"><b>%s</b><span>%s</span>%s</td>%s</tr>' % (
            html.escape(what), html.escape(', '.join(names)), ('<div>%s</div>' % links) if links else '',
            ''.join(_cell(models, c, sim, dol) for c in e['cols'])))
    return ('<div class="tw"><table><thead><tr><th>Variant (models)</th>%s</tr></thead><tbody>%s</tbody></table>'
            '</div>' % (''.join(_head(c) for c in e['cols']), ''.join(rows)))


def _facts(e, pages):
    """The hand-kept table, plus the entry's watch links: in a Watch column for rows that start with a watch
    model's name, in a line below for the rest."""
    watch = {}
    for m in e.get('watch', []):
        watch.setdefault(show(m), _links(pages.get(show(m), []), True))
    head, rows = e.get('facts') or ([], [])
    first = {n.split(' ')[0]: n for n in watch}
    in_rows = [first.get(r[0].split(' ')[0]) for r in rows]
    col = any(in_rows)
    out = ''
    if rows:
        out = '<div class="tw"><table><thead><tr>%s%s</tr></thead><tbody>%s</tbody></table></div>' % (
            ''.join('<th>%s</th>' % html.escape(h) for h in head), '<th>Watch</th>' if col else '',
            ''.join('<tr>%s%s</tr>' % (''.join('<td>%s</td>' % html.escape(c) for c in r),
                                       '<td>%s</td>' % watch.get(n, '') if col else '')
                    for r, n in zip(rows, in_rows)))
    rest = [n for n in watch if n not in in_rows]
    if rest:
        out += '<p class="small">Watch: %s</p>' % ' &middot; '.join(
            '%s %s' % (html.escape(n), watch[n]) for n in rest)
    return out


def _anchor(e):
    return 'x-%s-%s' % (e['date'], re.sub(r'[^a-z0-9]+', '-', e['title'].lower()).strip('-'))


def _day(d):
    return time.strftime('%d %b', time.strptime(d, '%Y-%m-%d'))


def _entry(e, sim, dol, pages, by_a=None):
    """One experiment, folded: date, title and the one-line result show; the rest opens. A record with an
    'assessment' id counts only the score rows written with that id."""
    if e.get('assessment'):
        sim = (by_a or {}).get(e['assessment'], {})
    tid = ', '.join(t for t in e['tasks'] if t.startswith('T-'))
    return ('<details class="x" id="%s"><summary><span class="when">%s</span><b>%s</b><span class="when">%s</span>'
            '<span class="short">%s</span></summary><div class="xb"><p class="q">%s</p>%s%s<dl><dt>Verdict</dt>'
            '<dd>%s</dd><dt>Decision</dt><dd>%s</dd></dl></div></details>' % (
                _anchor(e), _day(e['date']), html.escape(e['title']), html.escape(tid), html.escape(e['short']),
                html.escape(e['question']), _table(e, sim, dol, pages),
                _facts(e, pages) + ''.join('<p class="q"><a href="%s">%s</a></p>' % (html.escape(href), html.escape(text))
                                           for text, href in e.get('graphs', [])),
                html.escape(e['verdict']),
                html.escape(e['decision'])))


def _score(m, col, sim, dol):
    """One model against one column's opponent: 'ref' when it is the opponent, None when not scored, else
    [games, won, stocks taken, stocks lost]."""
    srcs, opps = _src_rows(col, sim, dol)
    if m in opps:
        return 'ref'
    s = [0, 0, 0.0, 0.0]
    for rows in srcs:
        r = rows.get(m)
        if r and r[0]:
            for k in range(4):
                s[k] += r[k]
    return s if s[0] else None


def _evals(entries, sim, dol, pages):
    """The evaluations table: every model of every experiment, one row each, newest experiment first. A model
    listed by several experiments (a reference) belongs to the oldest one."""
    home = {}
    for e in reversed(entries):
        for what, models in e['variants']:
            for m in models:
                home.setdefault(m, (e, what))
    rows = []
    for e in entries:
        for what, models in e['variants']:
            for m in models:
                if home.get(m, (None,))[0] is not e or e.get('rescore'):   # re-scored copies get no own row
                    continue
                del home[m]                       # a model listed twice in one entry gets one row
                name = show(m)
                cells = []
                for c in EVAL_COLS:
                    s = _score(m, c, sim, dol)
                    if s == 'ref':
                        cells.append('<td class="n d" data-v="-1" title="This model is the opponent">ref.</td>')
                    elif s is None:
                        cells.append('<td class="n d" data-v="-1">&ndash;</td>')
                    else:
                        pct = 100.0 * s[1] / s[0]
                        cells.append('<td class="n" data-v="%.2f" title="%d games, stock lead %+.2f a game">%d%%'
                                     '</td>' % (pct, s[0], (s[2] - s[3]) / s[0], round(pct)))
                links = _links(pages.get(name, []), True)
                rows.append('<tr data-i="%d" data-topic="%s" data-watch="%d"><td class="v"><b>%s</b><span>%s</span>'
                            '<div><a class="x" href="#%s">%s</a></div></td>%s<td class="w">%s</td></tr>' % (
                                len(rows), e['topic'], 1 if links else 0, html.escape(name),
                                html.escape(re.sub(r' \(reference[^)]*\)', '', what)), _anchor(e),
                                html.escape(e['title']), ''.join(cells), links or '<span class="when">&ndash;</span>'))
    heads = ''.join('<th class="n" data-c="%d" title="%s. Tap to sort.">%s</th>' % (
        i + 1, html.escape(OPP[c][1]), html.escape(OPP[c][0])) for i, c in enumerate(EVAL_COLS))
    return ('<div class="tw"><table id="evals"><thead><tr><th>Model</th>%s<th>Watch</th></tr></thead><tbody>%s'
            '</tbody></table></div>' % (heads, ''.join(rows)))


SCRIPT = """<script>
(function () {
  var tb = document.querySelector('#evals tbody'), rows = [].slice.call(tb.rows),
      q = document.getElementById('ev-q'), tp = document.getElementById('ev-topic'),
      w = document.getElementById('ev-watch'), n = document.getElementById('ev-n');
  function filter() {
    var s = q.value.toLowerCase(), c = 0;
    rows.forEach(function (r) {
      var ok = (!s || r.textContent.toLowerCase().indexOf(s) >= 0) && (!tp.value || r.dataset.topic === tp.value) &&
               (!w.checked || r.dataset.watch === '1');
      r.hidden = !ok; if (ok) c++;
    });
    n.textContent = c + ' of ' + rows.length + ' models';
  }
  q.oninput = tp.onchange = w.onchange = filter; filter();
  [].forEach.call(document.querySelectorAll('#evals th[data-c]'), function (th) {
    th.onclick = function () {
      var c = +th.dataset.c, on = th.classList.contains('on');
      [].forEach.call(th.parentNode.children, function (x) { x.classList.remove('on'); });
      rows.sort(on ? function (a, b) { return a.dataset.i - b.dataset.i; }
                   : function (a, b) { return b.cells[c].dataset.v - a.cells[c].dataset.v || a.dataset.i - b.dataset.i; });
      if (!on) th.classList.add('on');
      rows.forEach(function (r) { tb.appendChild(r); });
    };
  });
  // a link to one experiment opens it
  function open() {
    var t = location.hash && document.getElementById(location.hash.slice(1));
    if (t && t.tagName === 'DETAILS') { t.open = true; t.scrollIntoView(); }
  }
  window.addEventListener('hashchange', open); open();
})();
</script>"""


def _check(sim, dol):
    """Every task number and every end-of-run model in the score logs must be in an entry."""
    listed = {show(m) for e in EXPERIMENTS for _w, ms in e['variants'] for m in ms}
    tasks = {t for e in EXPERIMENTS for t in e['tasks']}
    logged = set(dol) | {m for rows in sim.values() for m in rows}
    missing_tasks = sorted({'T-%s' % re.match(r'T(\d+)', m)[1] for m in logged if re.match(r'T\d+', m)} - tasks)
    missing = sorted({show(m) for m in logged if end_of_run(m) and 'Smoke' not in m} - listed)
    if missing_tasks or missing:
        raise SystemExit('experiments.py: the score logs hold %s with no record. Add a record header to the plan '
                         'file in notes/experiments/ (or the models to a record\'s variants).' % '; '.join(
                             x for x in ['tasks ' + ', '.join(missing_tasks) if missing_tasks else '',
                                         'models ' + ', '.join(missing) if missing else ''] if x))


def _check_watch(pages):
    """Every variant of every experiment needs one model with something to watch (a game page or scenario
    playback). An entry whose models cannot be shown says why in 'no_game'."""
    missing = []
    for e in EXPERIMENTS:
        if e.get('no_game') or e.get('rescore'):      # re-scores of existing models: game pages optional
            continue
        if not e['variants'] and not e.get('watch'):   # no score table: the entry names what to watch itself
            missing.append('%s: no variants, so it needs watch=[models] or a no_game reason' % e['title'])
        for m in e.get('watch', []):
            if not pages.get(show(m)):
                missing.append('%s: watch model %s has no page' % (e['title'], m))
        for what, models in e['variants']:
            if models == ['random']:              # random play is not a saved model; the game report cannot play it
                continue
            if models and not any(pages.get(show(m)) for m in models):
                missing.append('%s: %s (%s)' % (e['title'], what, ', '.join(models)))
    if missing:
        raise SystemExit('experiments.py: variants with no game to watch. Make one page per variant with '
                         'research/game_pages/make_pages.sh in the main repo (or give the entry a no_game reason):'
                         '\n  ' + '\n  '.join(missing))


def build(here, src, head, site_style, pages=None):
    """Write experiments.html; return the raw model names it shows (for the name check)."""
    pages = pages or {}
    if not EXPERIMENTS:
        load(src)
    sim, dol, by_a = _sim_scores(src), _dolphin_scores(src), _sim_by_assessment(src)
    _check(sim, dol)
    _check_watch(pages)
    # newest day first; within a day the newer plan file first, and a file's records in their written order
    order = {id(e): i for i, e in enumerate(EXPERIMENTS)}
    entries = sorted(EXPERIMENTS, key=lambda e: (e['date'], e['source'], -order[id(e)]), reverse=True)
    shown = {m for e in entries for _w, ms in e['variants'] for m in ms}
    shown.update(m for e in entries for m in e.get('watch', []))
    for e in entries:
        for c in e['cols']:
            if isinstance(c, tuple):
                shown.update(c[1])
    titles = {k: t for k, t, _a in TOPICS}
    bad = [e['title'] for e in entries if e.get('topic') not in titles or not e.get('short')]
    if bad:
        raise SystemExit('experiments.py: entries need a topic (a key of TOPICS) and a short result line: %s'
                         % '; '.join(bad))
    recent = ''.join('<li><span class="when">%s</span><a class="t" href="#%s">%s</a><a class="chip" href="#t-%s">%s'
                     '</a><p>%s</p></li>' % (_day(e['date']), _anchor(e), html.escape(e['title']), e['topic'],
                                             html.escape(titles[e['topic']]), html.escape(e['short']))
                     for e in entries[:RECENT])
    topics, opts = [], []
    for key, title, about in TOPICS:
        mine = [e for e in entries if e['topic'] == key]
        if not mine:
            continue
        opts.append('<option value="%s">%s</option>' % (key, html.escape(title)))
        topics.append('<div class="topic" id="t-%s"><h3>%s<span>%d</span></h3><p class="small">%s</p>%s</div>' % (
            key, html.escape(title), len(mine), html.escape(about),
            ''.join(_entry(e, sim, dol, pages, by_a) for e in mine)))
    cols = ''.join('<dt>%s</dt><dd>%s.</dd>' % (html.escape(h), html.escape(a)) for h, a, _s in OPP.values())
    page = head.replace('</head>', '<title>SteveTheBot experiments</title><style>%s%s</style></head>' % (
        site_style, STYLE)) + """<main>
<header><h1>Experiments</h1>
<p>What was tested and what came of it. Rebuilt %s from the score logs.</p>
<div class="jump"><a href="#recent">Recent</a><a href="#topics">By what was tested</a><a href="#evaluations">Model
evaluations</a></div></header>
<section id="recent"><h2>Recent experiments</h2>
<p>The %d newest, with the result in one line. Tap a title for the full entry.</p>
<ol class="recent">%s</ol></section>
<section id="topics"><h2>By what was tested</h2>
<p>All %d experiments, grouped by subject, newest first in each group. Tap one to open its question, scores, verdict
and the decision made from it. Score cells are games won of 100 against that opponent, pooled over the variant's
runs; the small numbers under a cell are the single runs (two runs of the same settings often differ by 10 to
20).</p>
%s</section>
<section id="evaluations"><h2>Model evaluations</h2>
<p>Every model of every experiment, one row each, newest experiment first. Numbers are the share of games won
against that opponent; tap a column heading to sort by it. "Watch" opens a game or the scenario samples of that
model. The <a href="rankings.html">rankings</a> order the models per opponent; the
<a href="catalog.html">catalog</a> shows one model per change.</p>
<div class="evbar"><input type="search" id="ev-q" placeholder="Find a model" aria-label="Find a model">
<select id="ev-topic" aria-label="Subject"><option value="">Every subject</option>%s</select>
<label><input type="checkbox" id="ev-watch"> only models with something to watch</label><span id="ev-n"></span></div>
%s</section>
<section class="cols"><h2>The opponents in the columns</h2><dl class="cols">%s<dt>vs ...</dt><dd>Head to head: games
won against the models named in the column header (hover it).</dd></dl></section>
</main>%s</body></html>
""" % (time.strftime('%d %b %Y'), min(RECENT, len(entries)), recent, len(entries), '\n'.join(topics),
       ''.join(opts), _evals(entries, sim, dol, pages), cols, SCRIPT)
    (here / 'experiments.html').write_text(page, encoding='utf-8')
    return shown
