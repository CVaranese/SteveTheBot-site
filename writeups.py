"""experiments/<name>.html: the long form of an experiment, in the order of a paper (abstract, question and
hypothesis, setup, results, discussion and limitations, decision, reproduction).

A write-up is a Markdown file in the main repo, notes/experiments/public/<name>.md, named by its record's
'writeup' field (records.py). The record stays the source of the title, date, variants, columns, verdict and
decision. The write-up adds the typed parts, and places the generated parts with directives. Template and rules:
STYLE.md, "Write-ups".

Nothing on a page is typed from memory. The build stops when:
  - a setup row has no source, its source file is not in the main repo's git at the named commit, or its 'quote'
    (the text the value was read from) is not in that file at that commit;
  - an expectation quote is not, word for word, in the private plan file of the record;
  - a 'sources' file is not in git at its commit;
  - typed prose holds a score ('41%', '12 of 50', '+332 Elo'): scores come from the directives.

Front matter of a write-up:

  expectation  {written: 'YYYY-MM-DD', quotes: [text copied word for word from the plan file, ...]}
  setup        [{name, value, source: 'path@commit', quote: 'text in that file'}  or
                {name, value, checked: 'how and when it was checked on the machine'}]
  sources      [{what, file, commit}]: the scripts and code of the experiment, for the Reproduction section

Block directives (a line of their own):

  {{abstract}}      the record's 'short' and 'verdict'
  {{expectation}}   the quotes above, as block quotes with the day they were written
  {{setup}}         the setup table (setting, value, source)
  {{runs}}          one row per training run, read from logs/<run>_train.csv and models/<model>/controls.json
  {{scores}}        one table per score column: games, games won, share with its 95% interval, each run, stocks
  {{plots}}         one bar plot per score column
  {{training <column> | caption}}       a column of the training logs against training, a line per run
  {{curve <csv path> <column> | caption}}  rows of a run,checkpoint,decisions,<column> file (logs/t43/curves.csv)
  {{table <path> <n> | caption}}        the n-th (from 0) Markdown table of a file in the main repo
  {{line <path> | start of the line}}   one line of an analysis output file, word for word
  {{facts}}         the record's 'facts' table
  {{games}}         the sample game and scenario pages of each variant
  {{decision}}      the record's 'decision'
  {{sources}}       the 'sources' list

Inline directives: {{win C V}} share of games won, column C, variant V (both counted from 1); {{won C V}}
'x of y games'; {{fact R C}} a cell of the record's facts table; {{cell <path> <n> R C}} a cell of a Markdown table.
"""
import csv
import html
import json
import math
import re
import subprocess
import time
from pathlib import Path

import yaml

import experiments
import names
import records
import theme
from names import show
from rankings import _dolphin_scores, _sim_scores

esc = html.escape
PUBLIC = ('notes', 'experiments', 'public')
OUT = 'experiments'

# typed prose must not state scores: they come from the directives, so they cannot drift from the logs
SCORE_LIKE = re.compile(r'\d[\d.,]*\s?%|\b\d+ of \d+\b|[+-]?\d[\d.,]* Elo\b|\bElo of [+-]?\d')

# training-log columns a {{training}} figure may draw: column -> (axis label, what it is)
TRAIN = {
    'entropy': ('Policy entropy', 'how random the policy is; its maximum is the natural logarithm of the number '
                'of actions, and a lower value means more decided play'),
    'approx_kl': ('Policy change per update (approximate KL)', 'how far one update moved the policy'),
    'reward_per_min': ('Reward per minute', 'the training reward per minute of game time'),
    'explained_var': ('Explained variance of the critic', 'how well the critic predicts the returns (1 is exact)'),
    'lr': ('Learning rate', 'the step size of the optimiser'),
}

STYLE = """
main.paper{max-width:860px}
main.paper>*{min-width:0;max-width:100%}
.paper .crumb{font-size:.85rem;color:var(--muted)}
.paper .crumb a{text-decoration:none} .paper .crumb a:hover{text-decoration:underline}
.paper .meta{font:.82rem var(--mono);color:var(--muted);margin-top:6px}
.paper h2{border-top:1px solid var(--ink);padding-top:14px;margin:26px 0 8px}
.paper h3{margin:18px 0 6px}
.paper p{color:var(--ink);max-width:70ch;margin:0 0 10px}
.paper ul.md,.paper ol.md{border:0;margin:0 0 10px;padding-left:22px;max-width:70ch}
.paper ul.md{list-style:disc} .paper ol.md{list-style:decimal}
.paper .md li{display:list-item;border:0;padding:2px 0}
.paper blockquote{margin:0 0 10px;padding:2px 0 2px 14px;border-left:2px solid var(--accent);max-width:70ch}
.paper blockquote p{margin:0 0 6px}
.paper code{font:.88em var(--mono)}
.paper pre{font:.8rem/1.45 var(--mono);overflow-x:auto;border:1px solid var(--line);padding:10px;margin:0 0 10px}
.paper .abs{font-size:1.05rem}
.paper .abs p{max-width:74ch}
.paper figure{margin:6px 0 18px}
.paper figcaption,.paper .cap{font-size:.84rem;color:var(--muted);max-width:78ch;margin:6px 0 0}
.paper .cap b,.paper figcaption b{color:var(--ink);font-weight:600}
.paper .tb{overflow-x:auto;margin:0 0 4px}
.paper table{border-collapse:collapse;font-size:.86rem;min-width:100%}
.paper th{font:600 .7rem var(--body);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);text-align:left;
  border-top:1px solid var(--ink);border-bottom:1px solid var(--ink);padding:6px 12px 6px 0;vertical-align:bottom}
.paper td{border-bottom:1px solid var(--line);padding:6px 12px 6px 0;vertical-align:top}
.paper td.n,.paper th.n{text-align:right;font-family:var(--mono)}
.paper td.n{white-space:nowrap} .paper th.n{min-width:4.6rem}
.paper td:not(.n){min-width:9rem}
.paper .m{font-family:var(--mono);font-size:.82rem}
.paper td small{display:block;color:var(--muted);font:.76rem var(--mono)}
.paper .tblock{margin:0 0 20px}
.bars{display:grid;grid-template-columns:minmax(0,15rem) minmax(0,1fr) 3.2rem;gap:6px 10px;align-items:center;
  font-size:.86rem}
.bars .tr{position:relative;height:14px;background:var(--track)}
.bars .f{position:absolute;left:0;top:0;bottom:0;background:var(--bar)} .bars .f.top{background:var(--accent)}
.bars .h{position:absolute;left:50%;top:-2px;bottom:-2px;border-left:1px dashed var(--muted)}
.bars .t{position:absolute;top:-3px;bottom:-3px;width:2px;margin-left:-1px;background:var(--ink)}
.bars .v{font-family:var(--mono);text-align:right} .bars .na{color:var(--off)}
.viz{--s1:#2a78d6;--s2:#eb6834;--s3:#1baf7a;--s4:#eda100;--s5:#e87ba4;--s6:#008300;--s7:#6250d6;--s8:#e34948}
@media (prefers-color-scheme: dark){.viz{--s1:#3987e5;--s2:#d95926;--s3:#199e70;--s4:#c98500;--s5:#d55181;
  --s6:#2f9a2f;--s7:#7c6be0;--s8:#e0504f}}
.viz svg{display:block;width:100%;height:auto;max-width:760px}
.viz .ax{stroke:var(--ink);stroke-width:1} .viz .gr{stroke:var(--line);stroke-width:1}
.viz text{font:11px var(--mono);fill:var(--muted)} .viz text.al{font:12px var(--body);fill:var(--ink)}
.viz path{fill:none;stroke-width:1.6;stroke-linejoin:round}
.viz .lg{display:flex;flex-wrap:wrap;gap:4px 18px;font-size:.84rem;margin-top:6px}
.viz .lg i{display:inline-block;width:14px;height:3px;vertical-align:middle;margin-right:6px}
.paper .w{display:flex;gap:6px}
.paper .w a,.paper .w span{font-size:.78rem;padding:2px 8px;border:1px solid var(--ink);text-decoration:none}
.paper .w span{border:1px dashed var(--off);color:var(--off)}
.paper .foot{border-top:1px solid var(--ink);padding-top:10px;font-size:.84rem;color:var(--muted)}
.paper .foot p{color:var(--muted)}
@media (max-width:640px){.bars{grid-template-columns:minmax(0,1fr) 3.2rem}.bars .lb{grid-column:1/-1}}
"""


def stop(where, why):
    raise SystemExit('writeups.py: %s: %s' % (where, why))


def _squash(s):
    return re.sub(r'\s+', ' ', s).strip()


# ---------------------------------------------------------------- checks against git and the plan file
def _git_show(src, commit, path, where):
    r = subprocess.run(['git', '-C', str(src), 'show', '%s:%s' % (commit, path)], capture_output=True)
    if r.returncode:
        stop(where, 'no file %s at commit %s in the main repo' % (path, commit))
    return r.stdout.decode('utf-8', 'replace')


def _check_setup(rows, src, where):
    out = []
    for r in rows or []:
        extra = set(r) - {'name', 'value', 'source', 'quote', 'checked'}
        if extra or not r.get('name') or r.get('value') in (None, ''):
            stop(where, 'setup row %r needs name and value (unknown: %s)' % (r.get('name'), ', '.join(extra)))
        if r.get('checked'):
            out.append((str(r['name']), str(r['value']), 'Checked on the machine: %s' % r['checked']))
            continue
        m = re.fullmatch(r'(\S+)@([0-9a-f]{7,40})', str(r.get('source', '')))
        if not m or not r.get('quote'):
            stop(where, 'setup row "%s" needs source: path@commit and quote: the text in that file the value was '
                        'read from (or checked: how it was checked on the machine)' % r['name'])
        text = _git_show(src, m[2], m[1], where)
        if _squash(str(r['quote'])) not in _squash(text):
            stop(where, 'setup row "%s": the quote %r is not in %s at %s' % (r['name'], r['quote'], m[1], m[2]))
        out.append((str(r['name']), str(r['value']), '%s at commit %s' % (m[1], m[2][:7])))
    return out


def _check_expectation(exp, plan_text, where):
    if not exp:
        return None
    body = _squash(records.FRONT.sub('', plan_text, count=1))
    for q in exp.get('quotes') or []:
        if _squash(str(q)) not in body:
            stop(where, 'expectation quote is not word for word in the plan file: %r' % str(q)[:90])
    if not exp.get('written') or not exp.get('quotes'):
        stop(where, 'expectation needs written (the day) and quotes')
    return str(exp['written']), [str(q) for q in exp['quotes']]


def _check_sources(rows, src, where):
    out = []
    for r in rows or []:
        _git_show(src, str(r['commit']), str(r['file']), where)
        out.append((str(r['what']), str(r['file']), str(r['commit'])[:7]))
    return out


# ---------------------------------------------------------------- numbers from the logs
def _wilson(won, n):
    """95% Wilson interval of a share, in percent."""
    z = 1.96
    p = won / n
    mid = (p + z * z / (2 * n)) / (1 + z * z / n)
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / (1 + z * z / n)
    return 100 * (mid - half), 100 * (mid + half)


def _cell(models, col, sim, dol):
    """One variant against one column, with everything a results table shows. 'ref' when the variant's models are
    the opponent, None when nothing was scored."""
    srcs, opps = experiments._src_rows(col, sim, dol)
    if all(m in opps for m in models):
        return 'ref'
    runs, tot = [], [0, 0, 0.0, 0.0]
    for m in models:
        s = [0, 0, 0.0, 0.0]
        for rows in srcs:
            r = rows.get(m)
            if r and r[0]:
                for i in range(4):
                    s[i] += r[i]
        if s[0]:
            runs.append((show(m), s[0], s[1]))
            for i in range(4):
                tot[i] += s[i]
    if not tot[0]:
        return None
    lo, hi = _wilson(tot[1], tot[0])
    return {'g': tot[0], 'won': tot[1], 'p': 100.0 * tot[1] / tot[0], 'lo': lo, 'hi': hi, 'runs': runs,
            'taken': tot[2] / tot[0], 'lost': tot[3] / tot[0]}


def _opp(header):
    """A column header as an opponent's name in a caption: 'vs frozen T21L6s3' -> 'frozen T21L6s3'."""
    return re.sub(r'^vs ', '', header)


def _run_name(model):
    return re.sub(r'_c\d+$', '', model)


def _train_log(src, model):
    p = src / 'logs' / ('%s_train.csv' % _run_name(model))
    if not p.is_file():
        return None
    with p.open(encoding='utf-8') as f:
        return list(csv.DictReader(f))


def _mean(rows, key):
    v = [float(r[key]) for r in rows if r.get(key) not in (None, '')]
    return sum(v) / len(v) if v else None


def _num(x, d=0):
    return '&ndash;' if x is None else ('{:,.%df}' % d).format(x)


# ---------------------------------------------------------------- figures
def _ticks(lo, hi, n=5):
    span = (hi - lo) or 1.0
    step = 10 ** math.floor(math.log10(span / n))
    for k in (1, 2, 5, 10):
        if span / (step * k) <= n:
            step *= k
            break
    t = math.ceil(lo / step - 1e-9) * step
    out = []
    while t <= hi + step * 1e-9:
        out.append(0.0 if abs(t) < step * 1e-9 else t)
        t += step
    return out


def _fmt(v):
    if v == 0:
        return '0'
    a = abs(v)
    return ('%.0f' % v) if a >= 100 else ('%.4g' % v)


def _line_chart(series, xlabel, ylabel, logx=False):
    """series: [(legend label, colour number 1..8, [(x, y), ...])]; several series may share a label and colour
    (the runs of one variant). An inline SVG and its legend."""
    pts = [p for _l, _c, ps in series for p in ps]
    if not pts:
        return '<p class="cap">No data in the logs for this figure.</p>'
    W, H, L, R, T, B = 720, 330, 62, 14, 12, 46
    fx = (lambda x: math.log2(x)) if logx else (lambda x: x)
    x0, x1 = min(fx(p[0]) for p in pts), max(fx(p[0]) for p in pts)
    if not logx:
        x0 = min(x0, 0.0)
    y0, y1 = min(p[1] for p in pts), max(p[1] for p in pts)
    pad = (y1 - y0) * 0.06 or 1.0
    y0, y1 = y0 - pad, y1 + pad
    X = lambda x: L + (fx(x) - x0) / ((x1 - x0) or 1) * (W - L - R)
    Y = lambda y: H - B - (y - y0) / (y1 - y0) * (H - T - B)
    g = []
    for t in _ticks(y0, y1):
        g.append('<line class="gr" x1="%d" x2="%d" y1="%.1f" y2="%.1f"/><text x="%d" y="%.1f" text-anchor="end">%s'
                 '</text>' % (L, W - R, Y(t), Y(t), L - 6, Y(t) + 4, _fmt(t)))
    if logx:
        xt = [2.0 ** k for k in range(math.ceil(x0 - 1e-9), math.floor(x1 + 1e-9) + 1)]
        while len(xt) > 9:
            xt = xt[::2]
    else:
        xt = _ticks(x0, x1, 7)
    for t in xt:
        g.append('<line class="gr" x1="%.1f" x2="%.1f" y1="%d" y2="%d"/><text x="%.1f" y="%d" text-anchor="middle">'
                 '%s</text>' % (X(t), X(t), H - B, H - B + 4, X(t), H - B + 17, _fmt(t)))
    g.append('<line class="ax" x1="%d" x2="%d" y1="%d" y2="%d"/><line class="ax" x1="%d" x2="%d" y1="%d" y2="%d"/>'
             % (L, W - R, H - B, H - B, L, L, T, H - B))
    g.append('<text class="al" x="%.1f" y="%d" text-anchor="middle">%s</text>' % ((L + W - R) / 2, H - 8, esc(xlabel)))
    g.append('<text class="al" transform="translate(14 %.1f) rotate(-90)" text-anchor="middle">%s</text>'
             % ((T + H - B) / 2, esc(ylabel)))
    for _label, c, ps in series:
        d = ' '.join('%s%.1f %.1f' % ('M' if i == 0 else 'L', X(x), Y(y)) for i, (x, y) in enumerate(ps))
        g.append('<path d="%s" style="stroke:var(--s%d)"/>' % (d, c))
        if len(ps) <= 16:
            g.extend('<circle cx="%.1f" cy="%.1f" r="2.4" style="fill:var(--s%d)"/>' % (X(x), Y(y), c)
                     for x, y in ps)
    seen, legend = set(), []
    for label, c, _ps in series:
        if label not in seen:
            seen.add(label)
            legend.append('<span><i style="background:var(--s%d)"></i>%s</span>' % (c, esc(label)))
    return ('<div class="viz"><svg viewBox="0 0 %d %d" role="img" aria-label="%s against %s">%s</svg>'
            '<div class="lg">%s</div></div>' % (W, H, esc(ylabel), esc(xlabel), ''.join(g), ''.join(legend)))


# ---------------------------------------------------------------- Markdown (the small subset write-ups use)
class Page:
    def __init__(self, e, meta, body, src, sim, dol, links, where):
        self.e, self.meta, self.body, self.src, self.where = e, meta, body, src, where
        self.dol, self.links = dol, links
        self.sim = sim
        self.cells = [[_cell(ms, c, sim, dol) for c in e['cols']] for _w, ms in e['variants']]
        self.nt = self.nf = 0
        self.shown = set()

    # captions, numbered in page order
    def tcap(self, text):
        self.nt += 1
        return '<p class="cap"><b>Table %d.</b> %s</p>' % (self.nt, text)

    def fcap(self, text):
        self.nf += 1
        return '<figcaption><b>Figure %d.</b> %s</figcaption>' % (self.nf, text)

    def table(self, head, rows, cap, num=()):
        """rows of already-escaped cells; num: indexes of right-aligned number columns."""
        th = ''.join('<th%s>%s</th>' % (' class="n"' if i in num else '', h) for i, h in enumerate(head))
        tr = ''.join('<tr>%s</tr>' % ''.join('<td%s>%s</td>' % (' class="n"' if i in num else '', c)
                                              for i, c in enumerate(r)) for r in rows)
        return '<div class="tblock"><div class="tb"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table>' \
               '</div>%s</div>' % (th, tr, self.tcap(cap))

    # ---- inline
    def _vcell(self, c, v):
        try:
            x = self.cells[int(v) - 1][int(c) - 1]
        except (ValueError, IndexError):
            stop(self.where, 'no column %s / variant %s in the record' % (c, v))
        if not isinstance(x, dict):
            stop(self.where, 'column %s, variant %s has no scored games' % (c, v))
        return x

    def _md_cell(self, path, n, r, c):
        head, rows = records._md_table((self.src / path).read_text(encoding='utf-8'), int(n))
        return rows[int(r) - 1][int(c) - 1]

    def inline_directive(self, m):
        a = m[1].split()
        try:
            if a[0] == 'win':
                return '%.0f%%' % self._vcell(a[1], a[2])['p']
            if a[0] == 'won':
                x = self._vcell(a[1], a[2])
                return '%d of %d games' % (x['won'], x['g'])
            if a[0] == 'fact':
                return esc(self.e['facts'][1][int(a[1]) - 1][int(a[2]) - 1])
            if a[0] == 'cell':
                return esc(self._md_cell(a[1], a[2], a[3], a[4]))
        except (IndexError, KeyError, TypeError):
            pass
        stop(self.where, 'bad inline directive {{%s}}' % m[1])

    def inline(self, s, lint=True):
        if lint:
            bare = re.sub(r'\{\{.*?\}\}|`[^`]*`', '', s)
            m = SCORE_LIKE.search(bare)
            if m:
                stop(self.where, 'typed prose states a score (%r in: %s...). Scores come from the logs: use '
                     '{{win C V}}, {{won C V}}, {{fact R C}} or {{cell path n R C}}, or point at the table'
                     % (m[0], bare[:70]))
        s = esc(s, quote=False)
        s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
        s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
        s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<i>\1</i>', s)
        s = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', lambda m: '<a href="%s">%s</a>' % (esc(m[2]), m[1]), s)
        return re.sub(r'\{\{(.+?)\}\}', self.inline_directive, s)

    # ---- block directives
    def d_abstract(self, _a, _cap):
        return '<div class="abs"><p>%s</p><p>%s</p></div>' % (esc(self.e['short']), esc(self.e['verdict']))

    def d_decision(self, _a, _cap):
        return '<p>%s</p>' % esc(self.e['decision'])

    def d_expectation(self, _a, _cap):
        x = self.meta['expectation']
        if not x:
            stop(self.where, '{{expectation}} needs an expectation block in the front matter')
        return '<p class="cap">Written in the experiment plan on %s, before the runs:</p>%s' % (
            esc(_day(x[0])), ''.join('<blockquote><p>%s</p></blockquote>' % self.inline(_squash(q), lint=False) for q in x[1]))

    def d_setup(self, _a, _cap):
        rows = [[esc(n), esc(v), esc(s)] for n, v, s in self.meta['setup']]
        if not rows:
            stop(self.where, '{{setup}} needs setup rows in the front matter')
        return self.table(['Setting', 'Value', 'Read from'], rows,
                          'Settings of the experiment. Each value was read from the named file of the project\'s '
                          'code repository at the named commit; the site build checks that the line it was read '
                          'from is in that file.')

    def d_runs(self, _a, _cap):
        rows = []
        for what, models in self.e['variants']:
            for m in models:
                log = _train_log(self.src, m)
                if not log:
                    continue
                self.shown.add(m)
                secs = sum(float(r['rollout_s']) + float(r['train_s']) for r in log)
                lr0, lr1 = float(log[0]['lr']), float(log[-1]['lr'])
                ctl = self._controls(m)
                rows.append([
                    '<span class="m">%s</span>' % esc(show(m)), esc(what), _num(int(log[-1]['update'])),
                    _num(int(log[-1]['decisions']) / 1e6, 1),
                    '%g' % lr0 if lr0 == lr1 else '%g to %g' % (lr0, lr1),
                    _num(_mean(log[:100], 'entropy'), 2), _num(_mean(log[-100:], 'entropy'), 2),
                    _num(_mean(log[-100:], 'approx_kl'), 4), _num(secs / 3600, 2),
                    _num(_mean(log, 'decisions_per_s')), ctl])
        if not rows:
            return '<p class="cap">No training logs of these runs are stored.</p>'
        head = ['Run', 'Variant', 'Updates', 'Decisions by one player, million',
                'Learning rate, first to last update', 'Entropy, first 100 updates', 'Entropy, last 100 updates',
                'Policy change (approx. KL), last 100 updates', 'Hours in rollouts and updates',
                'Decisions per second, mean', 'Controls saved with the model']
        if all(r[-1] is None for r in rows):       # no model folder on the build machine: nothing to read
            head, rows = head[:-1], [r[:-1] for r in rows]
        else:
            rows = [r[:-1] + [r[-1] or '<span title="The model folder is not on the build machine">&ndash;</span>']
                    for r in rows]
        return self.table(
            head, rows,
            'The training runs, read from each run\'s training log (one row per update). Entropy is the policy\'s '
            'randomness; its maximum is the natural logarithm of the number of actions (%.2f for 54 actions, %.2f '
            'for 102, %.2f for 510). The hours add up the time spent in rollouts and updates, not saving or '
            'pauses; the runs of a batch shared the machine.' % (math.log(54), math.log(102), math.log(510)),
            num=(2, 3, 4, 5, 6, 7, 8, 9))

    def _controls(self, m):
        d = self.src / 'models' / m
        if not d.is_dir():
            return None
        p = d / 'controls.json'
        if not p.is_file():
            return 'no controls file'
        c = json.loads(p.read_text(encoding='utf-8'))
        say = {'frames_per_action': 'a decision every %s frame(s)', 'delay': 'delay %s frames',
               'input': 'input version %s'}
        return esc(', '.join(say.get(k, k + ' %s') % c[k] for k in sorted(c, key=lambda k: (k not in say, k))))

    def d_scores(self, _a, _cap):
        out = []
        for ci, c in enumerate(self.e['cols']):
            info = experiments._col(c)
            rows = []
            for vi, (what, models) in enumerate(self.e['variants']):
                x = self.cells[vi][ci]
                if x == 'ref':
                    rows.append([esc(what), '', '', '', 'opponent', '', '', '', ''])
                elif x is None:
                    rows.append([esc(what), '0', '0', '', 'not scored', '', '', '', ''])
                else:
                    each = ', '.join('%.0f' % (100.0 * w / g) for _n, g, w in x['runs'])
                    rows.append([esc(what), str(len(x['runs'])), _num(x['g']), _num(x['won']), '%.1f' % x['p'],
                                 '%.0f to %.0f' % (x['lo'], x['hi']), each, '%.2f' % x['taken'], '%.2f' % x['lost']])
            out.append(self.table(
                ['Variant', 'Runs scored', 'Games', 'Games won', 'Won, %', '95% interval', 'Each run, %',
                 'Stocks taken per game', 'Stocks lost per game'], rows,
                'Against <b>%s</b>: %s. All scored runs of a variant are pooled. The interval is the Wilson 95%% '
                'interval of the pooled share: it covers chance between games, not the difference between training '
                'runs, which "Each run" shows.' % (
                    esc(_opp(info['h'])), esc(re.sub(r';? ?\d+ games against each, pooled', '', info['tip']))),
                num=(1, 2, 3, 4, 5, 6, 7, 8)))
        if not out:
            return '<p class="cap">This experiment has no scored games.</p>'
        return ''.join(out)

    def d_plots(self, _a, _cap):
        out = []
        for ci, c in enumerate(self.e['cols']):
            info = experiments._col(c)
            ps = [v[ci]['p'] for v in self.cells if isinstance(v[ci], dict)]
            top = max(ps) if ps else None
            rows = []
            for vi, (what, _m) in enumerate(self.e['variants']):
                x = self.cells[vi][ci]
                lb = '<span class="lb">%s</span>' % esc(what)
                if not isinstance(x, dict):
                    rows.append('%s<div class="tr"></div><span class="v na">%s</span>'
                                % (lb, 'ref.' if x == 'ref' else '&ndash;'))
                    continue
                marks = ''.join('<i class="t" style="left:%.1f%%"></i>' % (100.0 * w / g)
                                for _n, g, w in x['runs']) if len(x['runs']) > 1 else ''
                rows.append('%s<div class="tr"><i class="h"></i><i class="f%s" style="width:%.1f%%"></i>%s</div>'
                            '<span class="v">%.0f%%</span>' % (lb, ' top' if x['p'] == top else '', x['p'], marks,
                                                               x['p']))
            out.append('<figure><div class="bars">%s</div>%s</figure>' % (''.join(rows), self.fcap(
                'Games won against <b>%s</b>, in percent. Bar: the runs of a variant pooled (the highest in red); '
                'marks: single runs; dashed line: 50%%.' % esc(_opp(info['h'])))))
        return ''.join(out)

    def _series_runs(self):
        """[(variant label, colour, model)] for every model of the record."""
        return [(what, vi % 8 + 1, m) for vi, (what, ms) in enumerate(self.e['variants']) for m in ms]

    def d_training(self, a, cap):
        col = a[0] if a else ''
        if col not in TRAIN:
            stop(self.where, '{{training}} needs one of: %s' % ', '.join(TRAIN))
        series, per = [], 0
        for what, c, m in self._series_runs():
            log = _train_log(self.src, m)
            if not log:
                continue
            per = max(1, math.ceil(len(log) / 80))
            ps = []
            for i in range(0, len(log), per):
                chunk = log[i:i + per]
                y = _mean(chunk, col)
                if y is not None:
                    ps.append((int(chunk[-1]['decisions']) / 1e6, y))
            series.append((what, c, ps))
        label, meaning = TRAIN[col]
        text = '%s during training (%s). One line per run, coloured by variant; each point is the mean of %d ' \
               'updates. Read from the training logs.' % (label, meaning, per)
        return '<figure>%s%s</figure>' % (
            _line_chart(series, 'Training so far, million decisions by one player', label),
            self.fcap((self.inline(cap) + ' ' if cap else '') + esc(text)))

    def d_curve(self, a, cap):
        if len(a) != 2 or not cap:
            stop(self.where, '{{curve <csv path> <column> | caption}}')
        want = {_run_name(m): (what, c) for what, c, m in self._series_runs()}
        by = {}
        with (self.src / a[0]).open(encoding='utf-8') as f:
            for r in csv.DictReader(f):
                if r['run'] in want and r.get(a[1]) not in (None, ''):
                    by.setdefault(r['run'], []).append((float(r['decisions']) / 1e6, float(r[a[1]])))
        series = [(want[run][0], want[run][1], sorted(ps)) for run, ps in by.items()]
        series.sort(key=lambda s: s[1])
        return '<figure>%s%s</figure>' % (
            _line_chart(series, 'Training so far, million decisions by one player (log scale)',
                        a[1].capitalize() if a[1] != 'elo' else 'Elo', logx=True),
            self.fcap(self.inline(cap) + ' One line per run, coloured by variant, one point per scored checkpoint.'))

    def d_table(self, a, cap):
        if len(a) != 2 or not cap:
            stop(self.where, '{{table <path> <n> | caption}}')
        head, rows = records._md_table((self.src / a[0]).read_text(encoding='utf-8'), int(a[1]))
        num = tuple(range(1, len(head)))
        cell = lambda c: '<span title="One run: no spread">n/a</span>' if c == 'nan' else esc(c)
        return self.table([esc(h) for h in head], [[esc(r[0])] + [cell(c) for c in r[1:]] for r in rows],
                          self.inline(cap) + ' From the analysis output <span class="m">%s</span>; a name ending '
                          'in <span class="m">_cNN</span> or a row <span class="m">cNN</span> is the copy saved at '
                          'checkpoint NN.' % esc(a[0]), num=num)

    def d_line(self, a, cap):
        """{{line <path> | start of the line}}: one line of an analysis output file, word for word."""
        if len(a) != 1 or not cap:
            stop(self.where, '{{line <path> | start of the line}}')
        hits = [ln.strip() for ln in (self.src / a[0]).read_text(encoding='utf-8').splitlines()
                if ln.strip().startswith(cap)]
        if len(hits) != 1:
            stop(self.where, '{{line}}: %d lines of %s start with %r' % (len(hits), a[0], cap))
        return '<p class="cap">From the analysis output <span class="m">%s</span>: "%s"</p>' % (
            esc(a[0]), esc(hits[0]))

    def d_facts(self, _a, _cap):
        f = self.e.get('facts')
        if not f:
            stop(self.where, '{{facts}}: the record has no facts table')
        return self.table([esc(h) for h in f[0]], [[esc(c) for c in r] for r in f[1]],
                          'Other numbers of the record, from its analysis files.')

    def d_games(self, _a, _cap):
        rows = []
        for what, models in self.e['variants']:
            lk = next((self.links[show(m)] for m in models if self.links.get(show(m))), {})
            one = lambda h, t: '<a href="../%s">%s</a>' % (esc(h), t) if h else \
                '<span title="No %s page was recorded">%s</span>' % (t.lower(), t)
            rows.append([esc(what) + '<small>%s</small>' % esc(', '.join(dict.fromkeys(show(m) for m in models))),
                         '<div class="w">%s%s</div>' % (one(lk.get('game'), 'Game'), one(lk.get('scen'), 'Scenarios'))])
        for t, h in self.e.get('graphs', []):
            rows.append([esc(t), '<div class="w"><a href="../%s">Graph</a></div>' % esc(h)])
        if not rows:
            return '<p class="cap">%s</p>' % esc(self.e.get('no_game') or 'Nothing recorded to watch.')
        return self.table(['Variant', 'Watch'], rows,
                          'Sample games: one whole game of a variant\'s first run, drawn with the animated viewer. '
                          'A dashed label means that page was not recorded.')

    def d_sources(self, _a, _cap):
        rows = [[esc(w), '<span class="m">%s</span>' % esc(f), '<span class="m">%s</span>' % esc(c)]
                for w, f, c in self.meta['sources']]
        if not rows:
            stop(self.where, '{{sources}} needs sources in the front matter')
        return self.table(['What', 'File in the code repository', 'Commit'], rows,
                          'The scripts and code of the experiment. The build checks that each file exists at its '
                          'commit. A commit records the script; the runs used the working copy of that day.')

    def directive(self, line):
        m = re.fullmatch(r'\{\{(\w+)([^|}]*)(?:\|(.*))?\}\}', line)
        fn = m and getattr(self, 'd_' + m[1], None)
        if not fn:
            stop(self.where, 'unknown directive %s' % line)
        return fn(m[2].split(), (m[3] or '').strip())

    # ---- blocks
    def render(self):
        out, lines, i = [], self.body.splitlines(), 0
        while i < len(lines):
            s = lines[i].rstrip()
            if not s.strip():
                i += 1
            elif s.startswith('```'):
                j = i + 1
                while j < len(lines) and not lines[j].startswith('```'):
                    j += 1
                out.append('<pre>%s</pre>' % esc('\n'.join(lines[i + 1:j])))
                i = j + 1
            elif re.fullmatch(r'\{\{.*\}\}', s.strip()) and not re.match(r'\{\{(win|won|fact|cell) ', s.strip()):
                out.append(self.directive(s.strip()))
                i += 1
            elif re.match(r'#{2,3} ', s):
                n = len(s) - len(s.lstrip('#'))
                text = s[n:].strip()
                out.append('<h%d id="%s">%s</h%d>' % (n, re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-'),
                                                      self.inline(text), n))
                i += 1
            elif re.match(r'!\[[^\]]*\]\([^)]+\)\s*$', s):
                m = re.match(r'!\[([^\]]*)\]\(([^)]+)\)', s)
                img = Path(__file__).resolve().parent / OUT / m[2]
                if not img.is_file():
                    stop(self.where, 'picture %s is not in the site repo\'s %s/ folder' % (m[2], OUT))
                out.append('<figure><img src="%s" alt="%s" style="max-width:100%%">%s</figure>'
                           % (esc(m[2]), esc(m[1]), self.fcap(self.inline(m[1]))))
                i += 1
            else:
                kind = 'q' if s.startswith('> ') else 'ul' if re.match(r'[-*] ', s) else \
                    'ol' if re.match(r'\d+\. ', s) else 'tb' if s.startswith('|') else 'p'
                j, block = i, []
                while j < len(lines) and lines[j].strip() and not lines[j].startswith(('#', '```', '{{')) or \
                        (j < len(lines) and lines[j].startswith('{{') and
                         re.match(r'\{\{(win|won|fact|cell) ', lines[j])):
                    block.append(lines[j].rstrip())
                    j += 1
                i = j
                if kind == 'q':
                    out.append('<blockquote><p>%s</p></blockquote>' % self.inline(
                        ' '.join(b[1:].strip() for b in block), lint=False))
                elif kind in ('ul', 'ol'):
                    items = []
                    for b in block:
                        m = re.match(r'(?:[-*]|\d+\.) (.*)', b)
                        if m:
                            items.append(m[1])
                        elif items:
                            items[-1] += ' ' + b.strip()
                    out.append('<%s class="md">%s</%s>' % (kind, ''.join('<li>%s</li>' % self.inline(x)
                                                                           for x in items), kind))
                elif kind == 'tb':
                    stop(self.where, 'typed tables are not allowed in a write-up: numbers come from the logs '
                                     '({{scores}}, {{runs}}, {{table path n | caption}}, {{facts}})')
                else:
                    out.append('<p>%s</p>' % self.inline(' '.join(b.strip() for b in block)))
        return '\n'.join(out)


def _day(d):
    t = time.strptime(d, '%Y-%m-%d')
    return '%d %s' % (t.tm_mday, time.strftime('%b %Y', t))


def page_name(e):
    """'experiments/<name>.html' of a record with a write-up, else ''."""
    return '%s/%s.html' % (OUT, Path(e['writeup']).stem) if e.get('writeup') else ''


def build(here, src, head, site_style, pages=None):
    """Write experiments/<name>.html for every record that names a write-up. Returns (the page paths from the site
    root, the raw model names the pages show)."""
    if not experiments.EXPERIMENTS:
        experiments.load(src)
    out = here / OUT
    out.mkdir(exist_ok=True)
    for old in out.glob('*.html'):
        old.unlink()
    sim, dol, by_a = _sim_scores(src), _dolphin_scores(src), experiments._sim_by_assessment(src)
    links = theme.watch_links(pages or {})
    topics = {k: t for k, t, _a in experiments.TOPICS}
    done, shown, used = [], set(), {}
    for e in experiments.EXPERIMENTS:
        if not e.get('writeup'):
            continue
        path = Path(src).joinpath(*PUBLIC) / e['writeup']
        where = e['writeup']
        if not path.is_file():
            stop(where, 'named by the record "%s" but not in notes/experiments/public/' % e['title'])
        if where in used:
            stop(where, 'named by two records ("%s" and "%s"): one write-up per record' % (used[where], e['title']))
        used[where] = e['title']
        text = path.read_text(encoding='utf-8')
        m = records.FRONT.match(text)
        fm = yaml.safe_load(m[1]) if m else {}
        bad = set(fm) - {'expectation', 'setup', 'sources'}
        if bad:
            stop(where, 'unknown front matter fields: %s' % ', '.join(sorted(bad)))
        plan = (Path(src) / 'notes' / 'experiments' / e['source']).read_text(encoding='utf-8')
        meta = {'setup': _check_setup(fm.get('setup'), src, where),
                'expectation': _check_expectation(fm.get('expectation'), plan, where),
                'sources': _check_sources(fm.get('sources'), src, where)}
        pg = Page(e, meta, text[m.end():] if m else text, Path(src),
                  by_a.get(e['assessment'], {}) if e.get('assessment') else sim, dol, links, where)
        body = pg.render()
        for _w, ms in e['variants']:
            shown.update(ms)
        shown.update(pg.shown)
        tasks = ', '.join(t for t in e['tasks'] if t.startswith('T-'))
        doc = head.replace('</head>', '<title>%s: SteveTheBot experiment</title><style>%s%s</style></head>' % (
            esc(e['title']), site_style, STYLE)) + """<main class="paper">
<header><p class="crumb"><a href="../experiments.html#%s">Experiments</a> / full write-up</p>
<h1>%s</h1>
<p class="meta">%s &middot; %s &middot; %s</p></header>
<article>
%s
</article>
<div class="foot"><p>Every number in the tables and figures is computed from the score and training logs when the site
is built (last built %s); none is typed. Setup values name the file and commit they were read from. The short
form of this experiment is <a href="../experiments.html#%s">its row in the experiments table</a>.</p></div>
</main></body></html>
""" % (experiments._anchor(e), esc(e['title']), esc(_day(e['date'])), esc(tasks), esc(topics[e['topic']]), body,
            time.strftime('%d %b %Y'), experiments._anchor(e))
        name = page_name(e)
        (here / name).write_text(doc, encoding='utf-8')
        done.append(name)
    return done, shown
