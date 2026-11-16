"""Experiment records: the header block (front matter) of each plan file in the main repo's notes/experiments/.

Only the header goes to the public site; the plan body stays private. A plan file starts with

    ---
    site:
    - title: A few words
      ...
    ---

and 'site' is a list, so one plan file can hold several records. Fields of one record (a template is in STYLE.md,
"Experiment records"):

  title     a few words
  date      day the results came in (YYYY-MM-DD); entries are listed newest first
  time      optional time of day the results came in ('HH:MM', quoted); without it the page uses the last score
            row of the record's models on that day, so only records with no scored games need it
  tasks     task ids the record covers, e.g. [T-37]; the first is shown
  topic     what was being tested: a key of experiments.TOPICS
  short     the result in one line
  question  the question in one line
  cols      score columns: keys of experiments.OPP (cpu9, pool2, t4v2, t21, ppo8, bot9, bot3), or
            {vs: header, models: [opponent model names], seeds: 1000} for head-to-head scores (seeds: the
            EVAL_SEED base the games were played with; default 1000)
  variants  [{what: what was tried, models: [model names as in the score logs]}]; seeds of one setting in one row.
            A model with no names.py entry is explained on the site by its row's 'what'
  assessment  optional: only score rows written with ASSESSMENT=<this> (sim/eval_vs_bot.py) count in the table
  graphs    optional [{text: link text, href: curves.html#<SETS key>/<BENCH key>}]
  facts     optional table for numbers that are not in the score logs: {head: [...], rows: [[...], ...]}
  facts_file  optional instead of facts: {path: file in the main repo, table: N}, the N-th (from 0) Markdown table
            of that file, e.g. logs/t43/fit.md
  watch     for a record with no variants: [model names] whose scenario and game pages it links
  no_game   for a record with nothing to watch: the reason, in a few words
  rescore   true for a record that only scores existing models again: game pages are optional
  writeup   optional: file name of the record's long form in notes/experiments/public/ (writeups.py builds
            experiments/<name>.html from it; template in STYLE.md, "Write-ups")
  verdict   what the scores say
  decision  what the user decided from it (or what is pending)
"""
import re
from pathlib import Path

import yaml

FIELDS = {'title', 'date', 'time', 'tasks', 'topic', 'short', 'question', 'cols', 'variants', 'assessment', 'graphs',
          'facts', 'facts_file', 'watch', 'no_game', 'rescore', 'writeup', 'verdict', 'decision'}
MAX_VERDICT = 450            # characters; the experiments page shows the numbers as a plot, the verdict reads them
NEEDED = ('title', 'date', 'tasks', 'topic', 'short', 'question', 'verdict', 'decision')
FRONT = re.compile(r'\A---[ \t]*\r?\n(.*?)\r?\n---[ \t]*(?:\r?\n|\Z)', re.S)


def header(path):
    """The parsed front matter of one file, or None when it has none."""
    m = FRONT.match(path.read_text(encoding='utf-8'))
    return yaml.safe_load(m[1]) if m else None


def _md_table(text, n):
    """The n-th Markdown table of a text: (header row, [rows])."""
    tables, cur = [], []
    for line in text.splitlines() + ['']:
        s = line.strip()
        if s.startswith('|'):
            cur.append([c.strip() for c in s.strip('|').split('|')])
        elif cur:
            tables.append(cur)
            cur = []
    t = tables[n]
    body = [r for r in t[1:] if not all(re.fullmatch(r':?-{2,}:?', c) for c in r)]
    return t[0], body


def _entry(rec, src, where):
    bad = sorted(set(rec) - FIELDS)
    miss = [k for k in NEEDED if not rec.get(k)]
    if bad or miss:
        raise SystemExit('%s: record "%s": %s' % (where, rec.get('title'), '; '.join(
            x for x in ['unknown fields ' + ', '.join(bad) if bad else '',
                        'missing ' + ', '.join(miss) if miss else ''] if x)))
    if len(str(rec['verdict'])) > MAX_VERDICT:
        raise SystemExit('%s: record "%s": verdict is %d characters, the limit is %d (two or three sentences; '
                         'detail belongs in the plan body)' % (where, rec['title'], len(str(rec['verdict'])),
                                                               MAX_VERDICT))
    e = dict(title=str(rec['title']), date=str(rec['date']), tasks=[str(t) for t in rec['tasks']],
             topic=rec['topic'], short=rec['short'], question=rec['question'], verdict=rec['verdict'],
             decision=rec['decision'], source=where)
    cols = []
    for c in rec.get('cols') or []:
        if isinstance(c, dict):
            cols.append((c['vs'], [str(m) for m in c['models']], int(c.get('seeds', 1000))))
        else:
            cols.append(c)
    e['cols'] = cols
    e['variants'] = [(v['what'], [str(m) for m in v['models']]) for v in rec.get('variants') or []]
    if rec.get('graphs'):
        e['graphs'] = [(g['text'], g['href']) for g in rec['graphs']]
    if rec.get('facts'):
        e['facts'] = ([str(h) for h in rec['facts']['head']], [[str(c) for c in r] for r in rec['facts']['rows']])
    elif rec.get('facts_file'):
        f = rec['facts_file']
        e['facts'] = _md_table((src / f['path']).read_text(encoding='utf-8'), int(f.get('table', 0)))
    for k in ('watch',):
        if rec.get(k):
            e[k] = [str(m) for m in rec[k]]
    for k in ('no_game', 'assessment', 'time', 'writeup'):
        if rec.get(k):
            e[k] = str(rec[k])
    e['rescore'] = bool(rec.get('rescore'))
    return e


def load(src):
    """Every record of every plan file under <src>/notes/experiments, as experiments.py entries."""
    out = []
    for p in sorted((Path(src) / 'notes' / 'experiments').glob('*.md')):
        h = header(p)
        if not h or 'site' not in h:
            continue
        for rec in h['site']:
            out.append(_entry(rec, Path(src), p.name))
    return out
