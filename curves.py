"""curves.html: how a run's strength grows as it trains. One point per saved checkpoint, one line per setting
(the mean of its runs, with the single runs drawn thin behind it), one graph per benchmark (usually: which
opponent). Built from the score logs of the SteveTheBot checkout, like the rankings:
  logs/yardstick.csv      games won by each checkpoint against each fixed opponent (sim/eval_vs_bot.py)
  logs/t43/curves.csv     the combined strength number (Elo) per checkpoint (research/t43_peak/fit.py)

To add runs: a row in SETS (and PER_CHECKPOINT if the run family is new). To add a benchmark: a row in BENCH.
A set or benchmark with no scored checkpoints is left out, so rows can be added before the scores exist.
"""
import csv
import json
import re
import time
from collections import defaultdict

# Million decisions per side between two saved checkpoints, by run family (updates x matches x 256 decisions).
PER_CHECKPOINT = [
    (r'T43', 12.06),       # 368 updates x 128 matches
    (r'T37', 12.04),       # 735 updates x 64 matches
    (r'T40M', 6.03),       # a quarter of that, at every match count
    (r'T19', 12.04),       # 735 updates x 64 matches (a decision every 2 frames)
]

# (key, title, what it compares, [(line label, [runs])]). At most 8 lines a set; a line keeps its colour.
SETS = [
    ('main', 'Highlights', 'The main settings so far, one line each.', [
        ('54 actions, long run (T43F54)', ['T43F54s1', 'T43F54s2', 'T43F54s3']),
        ('Button, stick and C-stick heads, long run (T43H510)', ['T43H510s1', 'T43H510s2', 'T43H510s3']),
        ('54 actions, 64 matches at once (T37Plain)', ['T37Plain7', 'T37Plain8']),
        ('54 actions, 128 matches at once (T40M128)', ['T40M128s7', 'T40M128s8']),
    ]),
    ('t43', 'Controllers, long runs (task T-43)', 'The 54 actions against the richer controllers, 12 times the usual '
     'training length.', [
        ('54 actions (T43F54)', ['T43F54s1', 'T43F54s2', 'T43F54s3']),
        ('Button, stick and C-stick heads (T43H510)', ['T43H510s1', 'T43H510s2', 'T43H510s3']),
        ('Button and stick heads (T43H102)', ['T43H102s1']),
    ]),
    ('t37', 'Memory of past frames (task T-37)', 'Plain inputs against inputs that also hold earlier game states, '
     'twice the usual training length.', [
        ('Plain inputs (T37Plain)', ['T37Plain7', 'T37Plain8']),
        ('4 past states, 8 frames apart (T37H4s8)', ['T37H4s8_7', 'T37H4s8_8']),
        ('8 past states, 4 frames apart (T37H8s4)', ['T37H8s4_7', 'T37H8s4_8']),
    ]),
    ('t40', 'Matches played at once (task T-40)', 'The same amount of play split over 64, 128 or 256 matches at '
     'once.', [
        ('64 matches (T40M64)', ['T40M64s7', 'T40M64s8']),
        ('128 matches (T40M128)', ['T40M128s7', 'T40M128s8']),
        ('256 matches (T40M256)', ['T40M256s7', 'T40M256s8']),
    ]),
    ('t19', 'Inputs (task T-19)', 'Earlier models (a decision every 2 frames, no reaction delay) with different '
     'inputs.', [
        ('The usual inputs (T19Base)', ['T19Base3', 'T19Base4']),
        ('Animation embedding, started small (T19EmbSmall)', ['T19EmbSmall2', 'T19EmbSmall3']),
        ('Animation embedding (T19Emb)', ['T19Emb2']),
        ('Previous button press as an input (T19Prev)', ['T19Prev3']),
    ]),
]

_POOL = ['model_T4V2s%d_c04_seeds1000' % s for s in (3, 4, 5, 6)]
# (key, tab text, what the benchmark is, yardsticks pooled or 'elo')
BENCH = [
    ('pool', 'Frozen pool', 'Share of games won against four saved models that no longer learn (T4V2, four random '
     'seeds, trained the usual length with today\'s controls). The routine yardstick.', _POOL),
    ('elo', 'All opponents (Elo)', 'One strength number from every game against a ladder of nine fixed opponents, '
     'from imitation-only up to the strongest saved model. Zero is the average of the frozen pool; 100 Elo more '
     'means winning about 64 of 100 games against an equal of before.', 'elo'),
    ('hum', 'T4HumP1', 'Share of games won against T4HumP1, the strongest fixed opponent: started from human '
     'replays, then trained by self-play.', ['model_T4HumP1_seeds1000']),
    ('im', 'Imitation only', 'Share of games won against T4ImFull, a model that only copies human replays and was '
     'never trained by playing.', ['model_T4ImFull_seeds1000']),
    ('ppo8', 'Frozen PPO8Self', 'Share of games won against a saved copy of PPO8Self, the yardstick of the earlier '
     'models.', ['model_PPO8Self_c04_seeds1000']),
]
MIN_GAMES = 40

# The landmarks graph: one bar per change made to the bot (catalog.CATALOG, in order), one graph per opponent.
# (key, tab text, what it is, 'cpu9' or the yardsticks pooled)
LAND_BENCH = [
    ('cpu9', 'Level 9 CPU', 'Share of games won against Melee\'s own hardest computer player, in the real game '
     '(Slippi Dolphin, 20 to 100 games a model). The only opponent every model has faced under the same conditions.',
     'cpu9'),
    ('t21', 'Frozen T21L6Cs4', 'Share of 100 simulator games won against a saved copy of T21L6Cs4, the best model '
     'that decides every 2 frames with no reaction delay.', ['model_T21L6Cs4_c04_seeds1000']),
    ('pool', 'Frozen pool', 'Share of simulator games won against the four T4V2 models, which act every frame '
     'with an 11-frame reaction delay like every model since.', _POOL),
    ('bot9', 'Scripted bot 9', 'Share of 100 simulator games won against the hand-written scripted bot at its '
     'highest level. Most trained models win nearly every game, so it only separates the early ones.',
     ['scripted_bot_level9_seeds1000']),
]
LAND_BREAK = 'T16F1D15s3_c04'       # first model that acts every frame with a reaction delay
LAND_BREAK_TEXT = ('From here on the bot decides every frame and acts on what it saw 11 to 15 frames ago, like a '
                   'human. That is a handicap against the opponents above the line, so a drop here is the cost '
                   'of the handicap, not a worse learner.')


def _landmarks(src, pages):
    """The landmarks card (html), and the raw model names it shows."""
    import html as H
    from catalog import CATALOG
    from names import show
    from rankings import _dolphin_scores, _links, _sim_scores
    sim, dol = _sim_scores(src), _dolphin_scores(src)
    tabs, panels = [], []
    for k, (key, tab, about, ys) in enumerate(LAND_BENCH):
        rows, prev = [], None
        for i, (model, change, what) in enumerate(CATALOG):
            if ys == 'cpu9':
                s = dol.get(model)
                g, w = (s[0], s[1]) if s else (0, 0)
                lead = (s[2] - s[3]) / g if g else 0.0
                me = False
            else:
                got = [sim[y][model] for y in ys if y in sim and model in sim[y]]
                g, w = sum(s[0] for s in got), sum(s[1] for s in got)
                lead = sum(s[2] - s[3] for s in got) / g if g else 0.0
                me = any(y == 'model_%s_seeds1000' % model for y in ys)
            if model == LAND_BREAK:
                rows.append('<li class="brk">%s</li>' % H.escape(LAND_BREAK_TEXT))
            head = '<span class="n">%d</span><span class="nm"><b>%s</b><i>%s</i></span>' % (
                i + 1, H.escape(change), H.escape(show(model)))
            watch = _links(pages.get(show(model), [])[:1], True)
            if me:
                cell = '<span class="bar"></span><span class="v d">is the opponent</span>'
            elif not g:
                cell = '<span class="bar"></span><span class="v d">not scored</span>'
            else:
                pct = 100.0 * w / g
                step = '' if prev is None else ' <small>%s%d</small>' % (
                    '+' if pct - prev >= 0.5 else ('−' if pct - prev <= -0.5 else '±'),
                    abs(round(pct - prev)))
                cell = ('<span class="bar" title="%d games, stock lead %+.2f a game"><span style="width:%.1f%%">'
                        '</span></span><span class="v">%d%%%s</span>' % (g, lead, max(pct, 0.6), round(pct), step))
                prev = pct
            rows.append('<li title="%s">%s%s<span class="w">%s</span></li>' % (H.escape(what), head, cell, watch))
        tabs.append('<button role="tab" aria-selected="%s" data-lm="%s">%s</button>' % (
            'true' if k == 0 else 'false', key, H.escape(tab)))
        panels.append('<div class="lm" id="lm-%s"%s><p class="about">%s</p><ol class="land">%s</ol></div>' % (
            key, '' if k == 0 else ' hidden', H.escape(about), ''.join(rows)))
    card = ('<section class="card viz" id="landmarks"><h2>Landmarks: one model per change</h2>'
            '<p class="about">Every change made to the bot, oldest first, each as one model scored against the '
            'same opponent. The small number is the step from the scored model above it. Hover a row for what '
            'the change was; the full table is the <a href="catalog.html">catalog</a>.</p>'
            '<div class="tabs" id="lmtabs" role="tablist" aria-label="Opponent">%s</div>%s'
            '<p class="small">One model per change, mostly one training run, so a step under about 10 points '
            'can be chance. The changes were not made one at a time under equal conditions: later models also '
            'carry every earlier change that was kept.</p></section>' % (''.join(tabs), ''.join(panels)))
    return card, {m for m, _c, _w in CATALOG}


def _per_checkpoint(run):
    for pat, m in PER_CHECKPOINT:
        if re.match(pat, run):
            return m
    return None


def _data(src):
    """{benchmark key: {run: [[million decisions, value, games or standard error], ...]}}"""
    won = defaultdict(lambda: defaultdict(lambda: [0, 0]))          # yardstick -> model -> [games, won]
    path = src / 'logs' / 'yardstick.csv'
    if path.is_file():
        for r in csv.DictReader(path.open(encoding='utf-8')):
            s = won[r['yardstick']][r['model']]
            s[0] += int(r['games'])
            s[1] += int(r['won'])
    runs = sorted({r for _k, _t, _a, lines in SETS for _l, rs in lines for r in rs})
    out = {}
    for key, _tab, _about, ys in BENCH:
        pts = {}
        if ys == 'elo':
            path = src / 'logs' / 't43' / 'curves.csv'
            if path.is_file():
                for r in csv.DictReader(path.open(encoding='utf-8')):
                    if r['run'] in runs:
                        pts.setdefault(r['run'], []).append(
                            [round(float(r['decisions']) / 1e6, 2), round(float(r['elo']), 1),
                             round(float(r['se']), 1)])
        else:
            for run in runs:
                per = _per_checkpoint(run)
                if per is None:
                    continue
                for c in range(1, 100):
                    g = sum(won[y]['%s_c%02d' % (run, c)][0] for y in ys if y in won)
                    w = sum(won[y]['%s_c%02d' % (run, c)][1] for y in ys if y in won)
                    if g >= MIN_GAMES:
                        pts.setdefault(run, []).append([round(c * per, 2), round(100.0 * w / g, 1), g])
        out[key] = {run: sorted(p) for run, p in pts.items() if len(p) >= 2}
    return out


STYLE = """
main{max-width:1100px}
.viz{--s1:#2a78d6;--s2:#eb6834;--s3:#1baf7a;--s4:#eda100;--s5:#e87ba4;--s6:#008300;--s7:#6250d6;--s8:#e34948;
  --grid:#e6e5ef;--axis:#b9b8cc}
@media (prefers-color-scheme: dark){.viz{--s1:#3987e5;--s2:#d95926;--s3:#199e70;--s4:#c98500;--s5:#d55181;
  --s6:#0ca30c;--s7:#9085e9;--s8:#e66767;--grid:#2a2940;--axis:#4a4964}}
.card{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:14px}
.row{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}
.row label{font-size:.85rem;color:var(--muted)}
select{font:inherit;font-size:.95rem;color:var(--ink);background:var(--surface);border:1px solid var(--line);
  border-radius:6px;padding:6px 8px;max-width:100%}
.tabs{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.tabs button,.leg button{font:inherit;font-size:.9rem;color:var(--ink);background:var(--surface);
  border:1px solid var(--line);border-radius:16px;padding:5px 12px;cursor:pointer}
.tabs button[aria-selected="true"]{background:var(--accent);border-color:var(--accent);color:var(--surface);
  font-weight:600}
.about{font-size:.9rem;margin-top:10px}
.plot{position:relative;margin-top:10px;touch-action:pan-y}
.plot svg{display:block;width:100%;height:auto;overflow:visible}
.plot text{font:12px system-ui,-apple-system,"Segoe UI",sans-serif;fill:var(--muted)}
.plot text.lab{fill:var(--ink);font-size:12.5px}
.tip{position:absolute;top:8px;pointer-events:none;background:var(--surface);border:1px solid var(--line);
  border-radius:6px;padding:8px 10px;font-size:.82rem;line-height:1.45;box-shadow:0 2px 10px rgba(0,0,0,.15);
  min-width:170px;max-width:280px;display:none;font-variant-numeric:tabular-nums}
.tip b{display:block;margin-bottom:2px}
.tip div{display:flex;gap:6px;align-items:baseline}
.tip i,.leg i{flex:none;display:inline-block;width:10px;height:10px;border-radius:50%}
.tip span{color:var(--muted)} .tip em{font-style:normal;margin-left:auto;padding-left:10px;font-weight:600}
.leg{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.leg button{display:flex;flex-wrap:wrap;gap:2px 7px;align-items:center;text-align:left;border-radius:6px;
  max-width:100%}
.card{min-width:0}
.leg button[aria-pressed="false"]{opacity:.45;text-decoration:line-through}
.opts{margin-left:auto;font-size:.85rem;color:var(--muted);display:flex;gap:6px;align-items:center}
.small{font-size:.85rem;margin-top:8px}
.tw{overflow-x:auto;margin-top:8px;border:1px solid var(--line);border-radius:6px}
table{border-collapse:collapse;width:100%;font-size:.88rem;font-variant-numeric:tabular-nums}
th,td{padding:6px 9px;text-align:right;border-top:1px solid var(--line);white-space:nowrap}
thead th{border-top:0;color:var(--muted);font-weight:600;font-size:.8rem;white-space:normal;vertical-align:bottom}
td span{color:var(--muted);font-size:.8rem}
dl.terms{display:grid;grid-template-columns:max-content 1fr;gap:4px 14px;font-size:.9rem;margin:6px 0 0}
dl.terms dt{font-weight:600} dl.terms dd{margin:0;color:var(--muted)}
@media (max-width:560px){dl.terms{grid-template-columns:1fr} .opts{margin-left:0}}
ol.land{list-style:none;margin:10px 0 0;padding:0;background:none;border:0}
ol.land li{display:grid;grid-template-columns:22px minmax(150px,290px) 1fr 86px 124px;gap:4px 10px;align-items:center;
  padding:5px 0;border-top:1px solid var(--grid)}
ol.land li:first-child{border-top:0}
ol.land .n{color:var(--muted);font-size:.8rem;text-align:right}
ol.land .nm b{display:block;font-size:.9rem;font-weight:600;line-height:1.25}
ol.land .nm i{display:block;font-style:normal;color:var(--muted);font-size:.78rem}
ol.land .bar{display:block;height:14px;background:var(--grid);border-radius:4px;overflow:hidden}
ol.land .bar span{display:block;height:100%;background:var(--s1);border-radius:0 4px 4px 0}
ol.land .v{font-size:.92rem;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--ink)}
ol.land .v.d{font-weight:400;color:var(--muted);font-size:.8rem}
ol.land .v small{font-weight:400;color:var(--muted);font-size:.78rem;margin-left:4px}
ol.land .w{font-size:.8rem;text-align:right}
ol.land .w a{white-space:nowrap}
ol.land li.brk{display:block;color:var(--muted);font-size:.84rem;padding:8px 0 8px 32px;
  border-top:2px solid var(--axis)}
@media (max-width:640px){ol.land li{grid-template-columns:22px 1fr 74px}
  ol.land .bar{grid-column:2 / 3;grid-row:2} ol.land .v{grid-column:3;grid-row:1 / 3;text-align:right}
  ol.land .v small{display:block;margin:0} ol.land .w{display:none}}
"""

SCRIPT = r"""
const D = __DATA__;
const $ = id => document.getElementById(id);
const state = {set: D.sets[0].key, bench: null, log: false, hidden: new Set()};
const fmt = (v, unit) => unit === 'elo' ? (v > 0 ? '+' : '') + Math.round(v) : Math.round(v) + '%';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

function linesFor(set, bench) {
  // each line: its runs' points and their mean at every amount of training any of its runs was scored at
  const P = D.pts[bench] || {};
  return set.lines.map((l, i) => {
    const runs = l.runs.filter(r => P[r]).map(r => ({name: r, pts: P[r]}));
    const at = new Map();
    runs.forEach(r => r.pts.forEach(p => { if (!at.has(p[0])) at.set(p[0], []); at.get(p[0]).push(p); }));
    const mean = [...at.entries()].sort((a, b) => a[0] - b[0]).map(([x, ps]) => ({
      x, y: ps.reduce((s, p) => s + p[1], 0) / ps.length, each: ps.map(p => p[1]), n: ps.reduce((s, p) => s + p[2], 0)}));
    return {label: l.label, slot: i + 1, runs, mean};
  }).filter(l => l.runs.length);
}
function benchesFor(set) { return D.bench.filter(b => linesFor(set, b.key).length); }
function nice(lo, hi, n) {
  const step0 = (hi - lo) / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= step0);
  const out = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

function render() {
  const set = D.sets.find(s => s.key === state.set);
  const benches = benchesFor(set);
  if (!benches.find(b => b.key === state.bench)) state.bench = benches[0].key;
  const bench = benches.find(b => b.key === state.bench);
  const unit = bench.unit;
  $('setabout').textContent = set.about;
  $('tabs').innerHTML = benches.map(b => `<button role="tab" aria-selected="${b.key === bench.key}" data-b="${b.key}">${esc(b.tab)}</button>`).join('');
  $('about').textContent = bench.about;
  const all = linesFor(set, bench.key);
  const key = l => set.key + '|' + l.label;
  const lines = all.filter(l => !state.hidden.has(key(l)));
  $('leg').innerHTML = all.map(l => `<button aria-pressed="${!state.hidden.has(key(l))}" data-l="${esc(l.label)}" title="Show or hide this line"><i style="background:var(--s${l.slot})"></i>${esc(l.label)}${l.runs.length > 1 ? ' <span style="color:var(--muted)">&middot; mean of ' + l.runs.length + ' runs</span>' : ''}</button>`).join('');

  const wrap = $('plot'), W = Math.max(300, wrap.clientWidth), wide = W >= 700 && lines.length <= 4;
  const H = Math.round(Math.max(260, Math.min(440, W * 0.56)));
  const m = {l: 46, r: wide ? 200 : 16, t: 12, b: 42};
  const xs = lines.flatMap(l => l.mean.map(p => p.x));
  const ysAll = lines.flatMap(l => l.runs.flatMap(r => r.pts.map(p => p[1])));
  let svg = '';
  if (!xs.length) { wrap.querySelector('svg').innerHTML = ''; $('table').innerHTML = ''; return; }
  const x0 = state.log ? Math.min(...xs) : 0, x1 = Math.max(...xs);
  const tx = v => state.log ? Math.log2(v) : v;
  const X = v => m.l + (tx(v) - tx(x0)) / ((tx(x1) - tx(x0)) || 1) * (W - m.l - m.r);
  let y0 = 0, y1 = 100, yt = [0, 25, 50, 75, 100];
  if (unit === 'elo') {
    y0 = Math.floor((Math.min(0, ...ysAll) - 20) / 100) * 100; y1 = Math.ceil((Math.max(0, ...ysAll) + 20) / 100) * 100;
    yt = nice(y0, y1, 6);
  }
  const Y = v => m.t + (y1 - v) / (y1 - y0) * (H - m.t - m.b);
  const ref = unit === 'elo' ? 0 : 50;
  yt.forEach(v => { svg += `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(${v === ref ? '--axis' : '--grid'})" stroke-width="1"/><text x="${m.l - 8}" y="${Y(v) + 4}" text-anchor="end">${fmt(v, unit)}</text>`; });
  let xt;
  if (state.log) { xt = []; for (let v = x0; v <= x1 * 1.01; v *= 2) xt.push(v); } else xt = nice(0, x1, W < 520 ? 4 : 8);
  xt.forEach(v => { svg += `<line x1="${X(v)}" x2="${X(v)}" y1="${H - m.b}" y2="${H - m.b + 5}" stroke="var(--axis)"/><text x="${X(v)}" y="${H - m.b + 19}" text-anchor="middle">${Math.round(v)}</text>`; });
  svg += `<text x="${(m.l + W - m.r) / 2}" y="${H - 4}" text-anchor="middle">Training so far, million decisions${state.log ? ' (each step is twice the training)' : ''}</text>`;
  const path = pts => pts.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join('');
  lines.forEach(l => { if (l.runs.length > 1) l.runs.forEach(r => { svg += `<path d="${path(r.pts)}" fill="none" stroke="var(--s${l.slot})" stroke-width="1" opacity=".38"/>`; }); });
  lines.forEach(l => {
    svg += `<path d="${path(l.mean.map(p => [p.x, p.y]))}" fill="none" stroke="var(--s${l.slot})" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
    l.mean.forEach(p => { svg += `<circle cx="${X(p.x).toFixed(1)}" cy="${Y(p.y).toFixed(1)}" r="${l.mean.length > 20 ? 3 : 4}" fill="var(--s${l.slot})" stroke="var(--surface)" stroke-width="2"/>`; });
  });
  if (wide) {            // names at the line ends, pushed apart when they would overlap
    const ends = lines.map(l => ({l, p: l.mean[l.mean.length - 1]})).map(e => ({...e, y: Y(e.p.y)})).sort((a, b) => a.y - b.y);
    for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 15) ends[i].y = ends[i - 1].y + 15;
    ends.forEach(e => { const t = e.l.label.replace(/ \(.*\)$/, ''); svg += `<text class="lab" x="${X(e.p.x) + 9}" y="${e.y + 4}">${esc(t.length > 31 ? t.slice(0, 30) + '…' : t)}</text>`; });
  }
  svg += `<line id="cross" x1="0" x2="0" y1="${m.t}" y2="${H - m.b}" stroke="var(--axis)" stroke-width="1" visibility="hidden"/>`;
  svg += `<rect id="hit" x="${m.l}" y="${m.t}" width="${W - m.l - m.r}" height="${H - m.t - m.b}" fill="transparent"/>`;
  const el = wrap.querySelector('svg');
  el.setAttribute('viewBox', `0 0 ${W} ${H}`);
  el.innerHTML = svg;

  const ux = [...new Set(xs)].sort((a, b) => a - b), tip = $('tip'), cross = el.querySelector('#cross');
  const show = ev => {
    const r = el.getBoundingClientRect(), px = (ev.clientX - r.left) * W / r.width;
    const x = ux.reduce((a, b) => Math.abs(X(b) - px) < Math.abs(X(a) - px) ? b : a);
    cross.setAttribute('x1', X(x)); cross.setAttribute('x2', X(x)); cross.setAttribute('visibility', 'visible');
    const rows = lines.map(l => ({l, p: l.mean.find(p => p.x === x)})).filter(e => e.p).sort((a, b) => b.p.y - a.p.y);
    tip.innerHTML = `<b>${Math.round(x)} million decisions</b>` + rows.map(e => `<div><i style="background:var(--s${e.l.slot})"></i><span>${esc(e.l.label.replace(/ \(.*\)$/, ''))}${e.p.each.length > 1 ? ' (' + e.p.each.map(v => fmt(v, unit)).join(', ') + ')' : ''}</span><em>${fmt(e.p.y, unit)}</em></div>`).join('');
    tip.style.display = 'block';
    const left = X(x) * r.width / W;
    if (left > r.width / 2) { tip.style.left = 'auto'; tip.style.right = (r.width - left + 12) + 'px'; }
    else { tip.style.right = 'auto'; tip.style.left = (left + 12) + 'px'; }
  };
  const hit = el.querySelector('#hit');
  hit.addEventListener('pointermove', show); hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', () => { tip.style.display = 'none'; cross.setAttribute('visibility', 'hidden'); });

  const games = lines.flatMap(l => l.mean.map(p => p.n / Math.max(1, p.each.length))).sort((a, b) => a - b);
  const g = games[Math.floor(games.length / 2)] || 0;
  $('note').textContent = unit === 'elo'
    ? 'Thick line: the mean of a setting’s runs. Thin lines: the single runs. One run’s point is known to about ±' + Math.round(g) + ' Elo; a run also moves up and down by about 50 Elo from one checkpoint to the next, so read the mean and the trend, not single points.'
    : 'Thick line: the mean of a setting’s runs. Thin lines: the single runs. One run’s point is ' + Math.round(g) + ' games, so chance alone moves it by about ±' + Math.round(100 * Math.sqrt(0.25 / Math.max(1, g))) + ' points; read the mean and the trend, not single points.';
  $('table').innerHTML = '<thead><tr><th>Million decisions</th>' + all.map(l => `<th>${esc(l.label)}</th>`).join('') + '</tr></thead><tbody>' +
    [...new Set(all.flatMap(l => l.mean.map(p => p.x)))].sort((a, b) => a - b).map(x => `<tr><td>${Math.round(x)}</td>` + all.map(l => { const p = l.mean.find(q => q.x === x); return '<td>' + (p ? fmt(p.y, unit) + (p.each.length > 1 ? ' <span>(' + p.each.map(v => fmt(v, unit)).join(', ') + ')</span>' : '') : '&ndash;') + '</td>'; }).join('') + '</tr>').join('') + '</tbody>';
  try { history.replaceState(null, '', '#' + state.set + '/' + state.bench); } catch (e) {}
}

$('set').innerHTML = D.sets.map(s => `<option value="${s.key}">${esc(s.title)}</option>`).join('');
const h = location.hash.slice(1).split('/');
if (D.sets.find(s => s.key === h[0])) { state.set = h[0]; state.bench = h[1] || null; }
$('set').value = state.set;
$('set').addEventListener('change', e => { state.set = e.target.value; render(); });
$('tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { state.bench = b.dataset.b; render(); } });
$('leg').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const k = state.set + '|' + b.dataset.l; state.hidden.has(k) ? state.hidden.delete(k) : state.hidden.add(k); render(); });
$('log').addEventListener('change', e => { state.log = e.target.checked; render(); });
$('lmtabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('#lmtabs button').forEach(x => x.setAttribute('aria-selected', x === b));
  document.querySelectorAll('.lm').forEach(p => { p.hidden = p.id !== 'lm-' + b.dataset.lm; }); });
let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(render, 120); });
render();
"""


def build(here, src, head, site_style, pages):
    """Write curves.html; return the raw run names it shows (for the name check)."""
    pts = _data(src)
    have = {run for b in pts.values() for run in b}
    sets = []
    for key, title, about, lines in SETS:
        if len(lines) > 8:
            raise SystemExit('curves.py: set %s has more than 8 lines' % key)
        kept = [{'label': lab, 'runs': [r for r in runs if r in have]} for lab, runs in lines]
        if any(l['runs'] for l in kept):
            sets.append({'key': key, 'title': title, 'about': about, 'lines': kept})
    bench = [{'key': k, 'tab': tab, 'about': about, 'unit': 'elo' if ys == 'elo' else 'pct'}
             for k, tab, about, ys in BENCH if pts.get(k)]
    data = json.dumps({'sets': sets, 'bench': bench, 'pts': pts}, separators=(',', ':'))
    land, land_names = _landmarks(src, pages)
    page = head.replace('</head>', '<title>SteveTheBot training curves</title><style>%s%s</style></head>' % (
        site_style, STYLE)) + """<main>
<header><h1>Training curves</h1>
<p>How strong a run is at each point of its training. Every saved copy of a model (a checkpoint) is one point; a
line is one setting. Pick which runs to compare, then switch the benchmark (usually: which opponent) with the
buttons. Below it, <a href="#landmarks">the landmarks</a>: one model per change made to the bot, on one page. Rebuilt %s from the same score logs as the <a href="rankings.html">rankings</a>.</p></header>
<section class="card viz">
<div class="row"><label for="set">Runs</label><select id="set"></select>
<label class="opts"><input type="checkbox" id="log"> Even steps per doubling of training</label></div>
<p class="about" id="setabout"></p>
<div class="tabs" id="tabs" role="tablist" aria-label="Benchmark"></div>
<p class="about" id="about"></p>
<div class="leg" id="leg"></div>
<div class="plot" id="plot"><svg role="img" aria-label="Line chart; the same numbers are in the table below"></svg>
<div class="tip" id="tip"></div></div>
<p class="small" id="note"></p>
<details><summary>The same numbers as a table</summary><div class="tw"><table id="table"></table></div></details>
</section>
%s
<section><h2>Reading the graphs</h2><dl class="terms">
<dt>Decision</dt><dd>One controller input chosen by the bot. Training length is counted in decisions made by one
player; a run of the usual length is 48 million.</dd>
<dt>Checkpoint</dt><dd>A copy of the model saved during training. It is scored later by playing games against
opponents that no longer change.</dd>
<dt>Runs and seeds</dt><dd>The same setting trained more than once, with different random numbers. Runs of one
setting differ by about 10 wins of 100, so a setting is judged by the mean of its runs.</dd>
<dt>Not on this page</dt><dd>Models whose checkpoints were never scored one by one, and the earliest runs, whose
checkpoints were saved by the clock, not by amount of training. Their end results are in the
<a href="rankings.html">rankings</a> and the <a href="catalog.html">catalog</a>.</dd>
</dl></section>
</main><script>%s</script></body></html>
""" % (time.strftime('%d %b %Y'), land, SCRIPT.replace('__DATA__', data))
    (here / 'curves.html').write_text(page, encoding='utf-8')
    return {r for s in sets for l in s['lines'] for r in l['runs']} | land_names
