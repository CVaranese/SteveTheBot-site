"""models.html: every model in one table. It replaces the rankings page (sort by an opponent's column), the catalog
("Milestones": one model per change made to the bot, catalog.CATALOG), the model-evaluations table of the
experiments page and the model-names lists. A row opens to what the model is, the experiment it came from, its
games and stock lead per opponent, its scenario scores and its watch links.

Built from the score logs (logs/yardstick.csv, logs/**/*_cpu9_games.csv, logs/scenario.csv). Only the copy saved at
the end of a run gets a row; a score needs the games of rankings.BOARDS to count. The training curves are the
second view of this tab (curves.html).
"""
import json
import re
import time

import catalog
import experiments
import theme
from names import NAME_PARTS, end_of_run, explain, show
from rankings import BOARDS, _dolphin_scores, _sim_scores

COLS = ['cpu9', 'pool2', 't4v2', 't21', 'ppo8', 'bot9']          # keys of rankings.BOARDS and experiments.OPP
SUB = ('<div class="sub"><a href="models.html"%s>All models</a><a href="curves.html"%s>Training curves</a></div>')


def sub(page):
    """The second line of the Models tab: which of its two views this is."""
    cur = ' aria-current="page"'
    return SUB % (cur if page == 'models' else '', cur if page == 'curves' else '')


def _scores(sim, dol):
    """{column: ({raw model: [games, won, taken, lost]}, {opponent raw names}, games needed)}."""
    out = {}
    for bid, _title, _about, source, need, _open in BOARDS:
        if bid not in COLS:
            continue
        if source == 'dolphin':
            out[bid] = ({m: s[:4] for m, s in dol.items()}, set(), need)
            continue
        sources = [source] if isinstance(source, str) else source
        tot = {}
        for y in sources:
            for m, s in sim.get(y, {}).items():
                t = tot.setdefault(m, [0, 0, 0.0, 0.0])
                for k in range(4):
                    t[k] += s[k]
        opps = {re.sub(r'_seeds\d+$', '', y[len('model_'):]) for y in sources if y.startswith('model_')}
        out[bid] = (tot, opps, need)
    return out


SCRIPT = r"""<script>
const D=__DATA__;
__LIB__
const S={view:'all',q:'',watch:false,k:'pool2',dir:-1,open:new Set()};
const val=(r,k)=>{const c=r.s[k];return c&&c!=='ref'?c.p:null};
function cell(c){
  if(c==='ref')return '<td class="n na" title="This model is the opponent">ref.</td>';
  if(!c)return '<td class="n na" title="Not scored">&ndash;</td>';
  return `<td class="n" title="${c.g} games, stock lead ${c.l} a game">${c.p}%</td>`;
}
function detail(r){
  const sc=D.cols.map(c=>{const x=r.s[c[0]];return x&&x!=='ref'?`<tr><td>${esc(c[1])}</td><td>${x.p}%</td><td>${x.l}</td><td>${x.g}</td></tr>`:''}).join('');
  const scen=r.scen?`<h4>Scenarios against frozen T21L6Cs4</h4><div class="fx"><table><thead><tr>${D.scen.map(s=>`<th title="${esc(s[1])}">${esc(s[0])}</th>`).join('')}</tr></thead><tbody><tr>${r.scen.map(v=>`<td>${v===null?'&ndash;':v+'%'}</td>`).join('')}</tr></tbody></table></div>`:'';
  return `<div class="det"><div><h4>What it is</h4><p>${esc(r.about)}</p>${r.ms?`<h4>Milestone ${r.ms[0]}: ${esc(r.ms[1])}</h4><p>${esc(r.ms[2])}</p>`:''}${r.x?`<h4>Experiment</h4><p><a href="experiments.html#${r.x[0]}">${esc(r.x[1])}</a></p>`:''}<h4>Watch</h4>${links(r)}</div><div><h4>Scores</h4>${sc?`<div class="fx"><table><thead><tr><th>Opponent</th><th>Won</th><th>Stock lead</th><th>Games</th></tr></thead><tbody>${sc}</tbody></table></div>`:'<p class="note">No scored games.</p>'}${scen}</div></div>`;
}
function draw(){
  const q=S.q.toLowerCase();
  let rows=D.rows.filter(r=>(S.view==='all'||r.ms)&&(!q||(r.name+' '+r.about).toLowerCase().includes(q))&&(!S.watch||r.game||r.scen_page));
  const k=S.k;
  rows.sort((a,b)=>{
    if(k==='name')return a.name.toLowerCase()<b.name.toLowerCase()?-S.dir:S.dir;
    if(k==='ms')return (a.ms[0]-b.ms[0])*S.dir;
    const x=val(a,k),y=val(b,k);
    if(x===null||y===null)return (x===null)-(y===null)||(a.name<b.name?-1:1);   // unscored rows stay last
    return (x-y)*S.dir||(parseFloat(a.s[k].l)-parseFloat(b.s[k].l))*S.dir});
  document.getElementById('count').textContent=rows.length+' of '+D.rows.length+' models, rebuilt '+D.built;
  let rank=0;
  document.getElementById('tb').innerHTML=rows.map(r=>{
    const ranked=k!=='name'&&k!=='ms'&&val(r,k)!==null;
    return `<tr class="r" data-n="${esc(r.name)}"><td class="n na">${k==='ms'?r.ms[0]:(ranked?++rank:'')}</td>
<td><div class="ti m">${esc(r.name)}</div>${r.ms?`<div class="tag">Milestone ${r.ms[0]}: ${esc(r.ms[1])}</div>`:''}<div class="sh">${esc(r.brief)}</div></td>
${D.cols.map(c=>cell(r.s[c[0]])).join('')}<td>${links({game:r.game,scen:r.scen_page})}</td></tr>`+
    (S.open.has(r.name)?`<tr class="d"><td colspan="${D.cols.length+3}">${detail(r)}</td></tr>`:'')}).join('');
  arrows('.cat',S.k,S.dir);
}
document.getElementById('ctl').innerHTML=[['all','All models',D.rows.length],['ms','Milestones',D.rows.filter(r=>r.ms).length]].map(t=>`<button class="chip${t[0]==='all'?' on':''}" data-t="${t[0]}">${t[1]}<i>${t[2]}</i></button>`).join('')+
  `<input type="search" id="q" placeholder="Search name or description" aria-label="Search"><label><input type="checkbox" id="wo">Can be watched</label>`;
document.getElementById('ctl').addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b)return;S.view=b.dataset.t;
  if(S.view==='ms'){S.k='ms';S.dir=1}else if(S.k==='ms'){S.k='pool2';S.dir=-1}
  document.querySelectorAll('#ctl [data-t]').forEach(x=>x.classList.toggle('on',x===b));draw()});
document.getElementById('ctl').addEventListener('input',e=>{if(e.target.id==='q')S.q=e.target.value;if(e.target.id==='wo')S.watch=e.target.checked;draw()});
document.querySelector('.cat thead').addEventListener('click',e=>{const th=e.target.closest('th[data-k]');if(!th)return;
  if(S.k===th.dataset.k)S.dir=-S.dir;else{S.k=th.dataset.k;S.dir=th.dataset.k==='name'?1:-1}draw()});
document.getElementById('tb').addEventListener('click',e=>{if(e.target.closest('a'))return;const tr=e.target.closest('tr.r');if(!tr)return;
  const n=tr.dataset.n;S.open.has(n)?S.open.delete(n):S.open.add(n);draw()});
function fromHash(){const n=decodeURIComponent(location.hash.slice(1));if(!D.rows.some(r=>r.name===n))return;S.open.add(n);draw();
  const el=[...document.querySelectorAll('tr.r')].find(t=>t.dataset.n===n);if(el)el.scrollIntoView()}
draw();fromHash();addEventListener('hashchange',fromHash);
</script>"""


def build(here, src, head, site_style, pages=None):
    """Write models.html; return the raw model names it shows (for the name check)."""
    links = theme.watch_links(pages or {})
    sim, dol = _sim_scores(src), _dolphin_scores(src)
    scores, scen = _scores(sim, dol), catalog._scenarios(src)
    miles = {m: (i + 1, change, what) for i, (m, change, what) in enumerate(catalog.CATALOG)}
    home = {}                                           # shown name -> the oldest experiment that lists the model
    for e in sorted(experiments.EXPERIMENTS, key=lambda e: e['date']):
        if e.get('rescore'):
            continue
        for _what, ms in e['variants']:
            for m in ms:
                home.setdefault(show(m), (experiments._anchor(e), e['title']))
    raw = set(miles)
    for tot, opps, need in scores.values():
        raw.update(m for m, s in tot.items() if s[0] >= need and end_of_run(m) and 'Smoke' not in m)
        raw.update(o for o in opps if end_of_run(o))
    rows = {}
    for m in sorted(raw):
        name = show(m)
        s = {}
        for col, (tot, opps, need) in scores.items():
            t = tot.get(m)
            if m in opps:
                s[col] = 'ref'
            elif t and t[0] >= need:
                s[col] = {'p': round(100.0 * t[1] / t[0]), 'g': int(t[0]), 'l': '%+.2f' % ((t[2] - t[3]) / t[0])}
        about = explain(name) or ''
        sc = [scen.get((m, metric)) for _c, metric, _a in catalog.SCEN]
        row = {'name': name, 'about': about, 'brief': about if len(about) <= 110 else about[:107].rstrip() + '...',
               's': s, 'ms': miles.get(m), 'x': home.get(name), 'game': links.get(name, {}).get('game'),
               'scen_page': links.get(name, {}).get('scen'),
               'scen': [None if v is None else round(v) for v in sc] if any(v is not None for v in sc) else None}
        old = rows.get(name)                       # two saved copies with one shown name: keep the scored one
        if not old or len(s) > len(old['s']):
            rows[name] = row
    data = {'rows': list(rows.values()), 'built': time.strftime('%d %b %Y'),
            'cols': [[c, experiments.OPP[c][0]] for c in COLS],
            'scen': [[c, a[0].upper() + a[1:]] for c, _m, a in catalog.SCEN]}
    blob = json.dumps(data, separators=(',', ':'), ensure_ascii=False).replace('</', '<\\/')
    heads = ''.join('<th class="n" data-k="%s" title="%s. Tap to rank by it.">%s<u></u></th>' % (
        c, experiments.OPP[c][1].replace('"', '&quot;'), experiments.OPP[c][0]) for c in COLS)
    opps = ''.join('<dt>%s</dt><dd>%s.</dd>' % (experiments.OPP[c][0], experiments.OPP[c][1]) for c in COLS)
    parts = ''.join('<dt>%s</dt><dd>%s</dd>' % (k, v) for k, v in NAME_PARTS)
    page = head.replace('</head>', '<title>SteveTheBot models</title><style>%s%s</style></head>' % (
        site_style, theme.CATALOG + '.cat .sh{min-width:300px;font-size:.86rem}.cat th.n{padding-left:14px}')) + """<main>
<header><h1>Models</h1>
<p>Every trained model, one row each, with the share of games it won against each fixed opponent. Tap a column
heading to rank by that opponent; tap a row for what the model is, its scenario scores and its games. "Milestones"
shows one model per change made to the bot, in order. Only the copy saved at the end of each training run is
listed.</p>%s</header>
<section><div class="ctl" id="ctl"></div>
<p class="count" id="count"></p>
<div class="catw"><table class="cat"><thead><tr><th class="ns n">#</th><th data-k="name">Model<u></u></th>%s
<th class="ns">Watch</th></tr></thead><tbody id="tb"></tbody></table></div>
<p class="note">Each model plays the same games (fixed seeds) against the same opponent. With 100 games, chance
alone moves a win share by about 5 points; with 50 games (CPU 9), about 7. Models that act every frame with a
reaction delay score near zero against the undelayed opponents (Frozen T21L6Cs4, Frozen PPO8Self) at the usual
training length.</p></section>
<section><details><summary>The opponents in the columns</summary><dl class="cols">%s</dl></details>
<details><summary>How to read a model name</summary><dl class="cols">%s</dl></details></section>
</main>%s</body></html>
""" % (sub('models'), heads, opps, parts,
       SCRIPT.replace('__LIB__', theme.CATALOG_JS).replace('__DATA__', blob))
    (here / 'models.html').write_text(page, encoding='utf-8')
    return raw
