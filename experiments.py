"""experiments.html: the experiment catalog. One table, one row per experiment (when, task, category, title and the
result in one line, a strip of its scores, what can be watched); a row opens to the question, verdict, decision, a
bar plot per opponent and the watch links of each variant. Sort by a column heading; filter by category, text, or
"can be watched".

Each entry is a record header in the main repo's notes/experiments/<date>-<slug>.md (front matter, read by
records.py; the fields are listed there and a template is in STYLE.md). The scores are filled from the score logs
at build time (logs/yardstick.csv from sim/eval_vs_bot.py; logs/**/*_cpu9_games.csv from run.py --games-log), so
new scores of a listed model show up on the next build. No score is typed by hand except 'facts', for numbers the
score logs do not hold. The time of day is the record's 'time', or else the last score row of its models that day.

The build stops when a score log holds a model no record lists (every end-of-run model, by its shown name), or a
task number no record covers. So every finished task writes its record header (rule in STYLE.md, "Experiments").
"""
import csv
import json
import re
import time
from collections import defaultdict

import names
import records
import theme
from names import end_of_run, show
from rankings import _dolphin_scores, _sim_scores

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

# the categories: (key, short label on the page, what belongs here), in page order
TOPICS = [
    ('replays', 'Replays', 'Learning from human replays: copying human Falcon games (imitation), then PPO from '
     'that start.'),
    ('method', 'Method', 'The learner itself: the 2017 baseline, PPO, learning rate, run length, network size, '
     'edits to a trained network.'),
    ('inputs', 'Inputs', 'Changes to the numbers the network is given each frame.'),
    ('controls', 'Controls', 'How often the bot acts, its reaction delay, and its buttons.'),
    ('yardsticks', 'Yardsticks', 'How the bot is measured: scenario tests, frozen opponents, the game report.'),
    ('speed', 'Speed', 'Whether the simulator matches the real game, and how fast runs go.'),
    ('pplus', 'Project+', 'The target game: running it and playing it with a Melee model.'),
]

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


def _times(src):
    """{model: [(time string, assessment id)]} of every score row, simulator and Dolphin."""
    out = defaultdict(list)
    path = src / 'logs' / 'yardstick.csv'
    if path.is_file():
        for r in csv.DictReader(path.open(encoding='utf-8')):
            out[r['model']].append((r['time'], r.get('assessment') or ''))
    for p in sorted((src / 'logs').rglob('*_cpu9_games.csv')):
        for r in csv.DictReader(p.open(encoding='utf-8')):
            out[r['model']].append((r['time'], ''))
    return out


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
    """One variant against one column: 'ref' when its models are the opponent, None when not scored, else
    {'p': pooled share won, 'runs': [share of each scored run], 'g': games}."""
    srcs, opps = _src_rows(col, sim, dol)
    if all(m in opps for m in models):
        return 'ref'
    runs, g, won = [], 0, 0
    for m in models:
        s = [0, 0]
        for rows in srcs:
            r = rows.get(m)
            if r and r[0]:
                s[0] += r[0]
                s[1] += r[1]
        if s[0]:
            runs.append(round(100.0 * s[1] / s[0]))
            g += s[0]
            won += s[1]
    return {'p': round(100.0 * won / g), 'runs': runs, 'g': g} if g else None


def _col(c):
    if isinstance(c, tuple):
        seeds = c[2] if len(c) > 2 else 1000
        return {'h': c[0], 'tip': 'Head to head: games won against %s%s' % (
            ', '.join(show(m) for m in c[1]),
            '' if seeds == 1000 else ' (games with seed base %d, not the usual 1000)' % seeds)}
    return {'h': OPP[c][0], 'tip': OPP[c][1]}


def _anchor(e):
    return 'x-%s-%s' % (e['date'], re.sub(r'[^a-z0-9]+', '-', e['title'].lower()).strip('-'))


def _rows(entries, sim, dol, by_a, links, times):
    out = []
    for i, e in enumerate(entries):
        s = by_a.get(e['assessment'], {}) if e.get('assessment') else sim
        variants, stamps = [], []
        for what, models in e['variants']:
            shown = []
            for m in models:
                if show(m) not in shown:
                    shown.append(show(m))
                stamps += [t for t, a in times.get(m, []) if t[:10] == e['date']
                           and (not e.get('assessment') or a == e['assessment'])]
            # a re-score names saved copies whose shown name is the run's: its page is another copy, so no link
            lk = {} if e.get('rescore') else next((links[n] for n in shown if links.get(n)), {})
            variants.append({'what': what, 'models': shown, 'game': lk.get('game'), 'scen': lk.get('scen'),
                             'cells': [_cell(models, c, s, dol) for c in e['cols']]})
        watch = [{'what': show(m), 'models': [], 'game': links.get(show(m), {}).get('game'),
                  'scen': links.get(show(m), {}).get('scen')} for m in e.get('watch', [])]
        facts = e.get('facts')
        out.append({
            'i': len(entries) - 1 - i, 'a': _anchor(e), 'date': e['date'],
            'time': e.get('time') or (max(stamps)[11:16] if stamps else ''),
            'task': ', '.join(t for t in e['tasks'] if t.startswith('T-')), 'topic': e['topic'],
            'title': e['title'], 'short': e['short'], 'question': e['question'], 'verdict': e['verdict'],
            'decision': e['decision'], 'cols': [_col(c) for c in e['cols']], 'variants': variants, 'watch': watch,
            'facts': {'head': facts[0], 'rows': facts[1]} if facts and facts[1] else None,
            'graphs': [{'text': t, 'href': h} for t, h in e.get('graphs', [])],
            'no_game': e.get('no_game') or '', 'rescore': bool(e.get('rescore'))})
    return out


# The page script. __LIB__ is theme.CATALOG_JS, __DATA__ the rows.
SCRIPT = r"""<script>
const D=__DATA__;
__LIB__
const TL=Object.fromEntries(D.topics.map(t=>[t[0],t[1]]));
const S={topic:'all',q:'',watch:false,k:'when',dir:-1,open:new Set()};
const tnum=r=>{const m=/T-(\d+)/.exec(r.task);return m?+m[1]:-1};
function rowWatch(r){const all=r.variants.concat(r.watch),g=all.find(v=>v.game),s=all.find(v=>v.scen);
  return {game:g&&g.game,scen:s&&s.scen}}
const why=r=>r.no_game?'Nothing to watch: '+r.no_game:(r.rescore?'A re-score of existing models: see the original experiment':'');
function mini(r){
  if(!r.cols.length)return '';
  const cs=r.variants.map(v=>v.cells[0]).filter(c=>c&&c!=='ref');
  if(!cs.length)return '';
  const top=Math.max(...cs.map(c=>c.p));
  return `<div class="mini">${cs.slice(0,10).map(c=>`<b class="${c.p===top?'top':''}" style="height:${Math.max(3,c.p)}%" title="${c.p}%"></b>`).join('')}</div><div class="minih">${esc(r.cols[0].h)}</div>`;
}
function plots(r){
  if(!r.cols.length||!r.variants.length)return '';
  return '<div class="plots">'+r.cols.map((c,ci)=>{
    const ps=r.variants.map(v=>v.cells[ci]).filter(x=>x&&x!=='ref').map(x=>x.p),top=ps.length?Math.max(...ps):-1;
    return `<div class="plot"><h5 title="${esc(c.tip)}">${esc(c.h)} <small>games won, %</small></h5>`+r.variants.map(v=>{
      const x=v.cells[ci],lb=`<span class="lb" title="${esc(v.what)}">${esc(v.what)}</span>`;
      if(x==='ref')return `<div class="pr">${lb}<div class="tr"></div><span class="v na" title="These models are the opponent">ref.</span></div>`;
      if(!x)return `<div class="pr">${lb}<div class="tr"></div><span class="v na" title="Not scored">&ndash;</span></div>`;
      const ticks=x.runs.length>1?x.runs.map(p=>`<i class="t" style="left:${p}%"></i>`).join(''):'';
      return `<div class="pr">${lb}<div class="tr" title="${x.g} games${x.runs.length>1?'; single runs '+x.runs.join(', '):''}"><i class="h"></i><i class="f ${x.p===top?'top':''}" style="width:${x.p}%"></i>${ticks}</div><span class="v">${x.p}%</span></div>`;
    }).join('')+'</div>';
  }).join('')+'<p class="note">Bar: all runs of the variant pooled. Marks: single runs (two runs of the same settings often differ by 10 to 20). Dashed line: 50%.</p></div>';
}
function facts(r){
  if(!r.facts)return '';
  return `<h4>Other numbers</h4><div class="fx"><table><thead><tr>${r.facts.head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${r.facts.rows.map(x=>`<tr>${x.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function detail(r){
  const vs=r.variants.concat(r.watch);
  const watch=vs.length?`<h4>Watch</h4><table class="vw">${vs.map(v=>`<tr><td>${esc(v.what)}<small>${esc(v.models.join(', '))}</small></td><td>${links(v,why(r))}</td></tr>`).join('')}</table>`:
    `<h4>Watch</h4><p class="note">${esc(why(r)||'Nothing recorded to watch.')}</p>`;
  const graphs=r.graphs.length?`<h4>Training curves</h4><p>${r.graphs.map(g=>`<a href="${esc(g.href)}">${esc(g.text)}</a>`).join('<br>')}</p>`:'';
  return `<div class="det"><div><h4>Question</h4><p>${esc(r.question)}</p><h4>Verdict</h4><p>${esc(r.verdict)}</p><h4>Decision</h4><p>${esc(r.decision)}</p>${graphs}</div><div><h4>Results</h4>${plots(r)||(r.facts?'':'<p class="note">No scored games in this experiment.</p>')}${facts(r)}${watch}</div></div>`;
}
function draw(){
  const q=S.q.toLowerCase();
  let rows=D.rows.filter(r=>(S.topic==='all'||r.topic===S.topic)&&(!q||(r.title+' '+r.short+' '+r.task+' '+r.variants.map(v=>v.models.join(' ')).join(' ')).toLowerCase().includes(q))&&(!S.watch||rowWatch(r).game||rowWatch(r).scen));
  const key={when:r=>r.date+' '+(r.time||'00:00')+String(1000+r.i),task:tnum,topic:r=>TL[r.topic],title:r=>r.title.toLowerCase()}[S.k];
  rows.sort((a,b)=>{const x=key(a),y=key(b);return (x<y?-1:x>y?1:0)*S.dir});
  document.getElementById('count').textContent=rows.length+' of '+D.rows.length+' experiments, rebuilt '+D.built;
  document.getElementById('tb').innerHTML=rows.map(r=>`<tr class="r" id="${r.a}" data-i="${r.i}">
<td class="c-when"><div class="when">${day(r.date)}<span>${r.time||''}</span></div></td>
<td class="c-meta"><span class="task">${esc(r.task)}</span></td>
<td class="c-meta c-topic"><span class="topic">${esc(TL[r.topic])}</span></td>
<td class="c-main"><div class="ti">${esc(r.title)}</div><div class="sh">${esc(r.short)}</div></td>
<td class="c-mini">${mini(r)}</td>
<td class="c-w">${links(rowWatch(r),why(r))}</td></tr>`+(S.open.has(r.i)?`<tr class="d"><td colspan="6">${detail(r)}</td></tr>`:'')).join('');
  arrows('.cat',S.k,S.dir);
}
function controls(){
  const n=k=>D.rows.filter(r=>k==='all'||r.topic===k).length;
  document.getElementById('ctl').innerHTML=[['all','All','Every experiment']].concat(D.topics.filter(t=>n(t[0]))).map(t=>`<button class="chip${S.topic===t[0]?' on':''}" data-t="${t[0]}" title="${esc(t[2])}">${esc(t[1])}<i>${n(t[0])}</i></button>`).join('')+
    `<input type="search" id="q" placeholder="Search title, task, model" aria-label="Search"><label><input type="checkbox" id="wo">Can be watched</label>`;
}
document.getElementById('ctl').addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b)return;S.topic=b.dataset.t;
  document.querySelectorAll('#ctl [data-t]').forEach(x=>x.classList.toggle('on',x===b));draw()});
document.getElementById('ctl').addEventListener('input',e=>{if(e.target.id==='q')S.q=e.target.value;if(e.target.id==='wo')S.watch=e.target.checked;draw()});
document.querySelector('.cat thead').addEventListener('click',e=>{const th=e.target.closest('th[data-k]');if(!th)return;
  if(S.k===th.dataset.k)S.dir=-S.dir;else{S.k=th.dataset.k;S.dir=th.dataset.k==='when'?-1:1}draw()});
document.getElementById('tb').addEventListener('click',e=>{if(e.target.closest('a'))return;const tr=e.target.closest('tr.r');if(!tr)return;
  const i=+tr.dataset.i;S.open.has(i)?S.open.delete(i):S.open.add(i);draw()});
function fromHash(){const r=D.rows.find(r=>'#'+r.a===location.hash);if(!r)return;S.open.add(r.i);draw();
  const el=document.getElementById(r.a);if(el)el.scrollIntoView()}
controls();draw();fromHash();addEventListener('hashchange',fromHash);
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
    keys = {k for k, _t, _a in TOPICS}
    bad = [e['title'] for e in entries if e.get('topic') not in keys or not e.get('short')]
    if bad:
        raise SystemExit('experiments.py: entries need a topic (a key of TOPICS) and a short result line: %s'
                         % '; '.join(bad))
    data = {'rows': _rows(entries, sim, dol, by_a, theme.watch_links(pages), _times(src)),
            'topics': [list(t) for t in TOPICS], 'built': time.strftime('%d %b %Y')}
    blob = json.dumps(data, separators=(',', ':'), ensure_ascii=False).replace('</', '<\\/')
    cols = ''.join('<dt>%s</dt><dd>%s.</dd>' % (h, a) for h, a, _s in OPP.values())
    page = head.replace('</head>', '<title>SteveTheBot experiments</title><style>%s%s</style></head>' % (
        site_style, theme.CATALOG)) + """<main>
<header><h1>Experiments</h1>
<p>Every experiment as one row: when it ran, what it tested, and the result in one line. Tap a row for its scores as
a plot, the verdict, the decision made from it, and a sample game of each variant. A dashed grey button means that
page was never recorded.</p></header>
<section><div class="ctl" id="ctl"></div>
<p class="count" id="count"></p>
<table class="cat stack"><colgroup><col style="width:84px"><col style="width:110px"><col style="width:120px"><col>
<col style="width:200px"><col style="width:176px"></colgroup><thead><tr>
<th data-k="when">When<u></u></th><th data-k="task">Task<u></u></th><th data-k="topic">Category<u></u></th>
<th data-k="title">Experiment and result<u></u></th><th class="ns">Scores</th><th class="ns">Watch</th></tr></thead>
<tbody id="tb"></tbody></table></section>
<section><details><summary>The opponents in the plots</summary><dl class="cols">%s<dt>vs ...</dt><dd>Head to head:
games won against the models named in the plot's title.</dd></dl></details></section>
</main>%s</body></html>
""" % (cols, SCRIPT.replace('__LIB__', theme.CATALOG_JS).replace('__DATA__', blob))
    (here / 'experiments.html').write_text(page, encoding='utf-8')
    return shown
