#!/usr/bin/env python3
"""Start the write-up of an experiment: a draft notes/experiments/public/<name>.md in the main repo.

    python new_writeup.py <plan file name> <record number, from 1> <name> [--script research/x/batch.sh ...]
                          [--trainer sim/ppo_run.py] [--at <commit>] [--src ../SteveTheBot]

The draft holds the paper sections with the directives this record can fill (score tables only when it has score
columns, training figures only when training logs exist, and so on), the 'sources' list, and one sourced setup
row per training setting:

  - a setting the batch script passes on the command line is quoted from the script (the line with the flag);
  - every other setting is quoted from the trainer's own default at the same commit.

The commit of a script is the last one that changed it on or before the record's date (--at overrides). Each
value starts with DRAFT and the site build refuses a write-up that still holds that word, so every row is read
and worded by hand before it can be published. What is left to type: the wording of the values, the expectation
quotes (copied from the plan), the question, the scoring paragraph, Discussion and Limitations. Rules: STYLE.md,
"Write-ups".
"""
import argparse
import re
import subprocess
import sys
from pathlib import Path

import records
import writeups

# (row name, trainer flag); in page order
SETTINGS = [
    ('Opponent in training', '--opponent'), ('Start model', '--init-from'), ('Network, hidden layers', '--hidden'),
    ('Controller', '--controller'), ('Learning rate', '--lr'), ('Learning rate schedule', '--lr-schedule'),
    ('Training seeds', '--seed'), ('Length of a run', '--max-updates'), ('Length of a run, minutes', '--minutes'),
    ('Matches played at once in a run', '--matches'), ('Decisions per match per update', '--steps'),
    ('Passes over each rollout', '--epochs'), ('Minibatches per pass', '--minibatches'),
    ('PPO clip range', '--clip'), ('Entropy bonus weight', '--ent-coef'), ('Value loss weight', '--vf-coef'),
    ('Gradient clip (norm)', '--max-grad-norm'), ('Discount', '--gamma'), ('GAE lambda', '--lam'),
    ('Frames per decision', '--frames-per-action'), ('Reaction delay, frames', '--delay'),
    ('Input version', '--input'), ('Past states in the input', '--frames'), ('Animation embedding', '--embed'),
    ('Previous action in the input', '--prev-action'), ('Device', '--device'),
]
# where a default of None is filled in: flag -> start of the trainer line that does it
FILLED = {'--gamma': 'args.gamma = ', '--lam': 'args.lam = ', '--steps': 'args.steps = ',
          '--minibatches': 'a.minibatches = ', '--frames-per-action': 'NEW_MODEL_CONTROLS = ',
          '--delay': 'NEW_MODEL_CONTROLS = '}


def git(src, *a):
    r = subprocess.run(['git', '-C', str(src)] + list(a), capture_output=True)
    return r.stdout.decode('utf-8', 'replace') if r.returncode == 0 else None


def yq(s):
    """A YAML single-quoted string."""
    return "'" + s.replace("'", "''") + "'"


def setup_rows(src, scripts, trainer):
    rows, notes = [], []
    tcommit = scripts[0][1] if scripts else None
    ttext = git(src, 'show', '%s:%s' % (tcommit, trainer)) if tcommit else None
    if scripts and ttext is None:
        notes.append('# %s is not in git at %s: no default rows were drafted' % (trainer, tcommit))
    for name, flag in SETTINGS:
        hits = []
        for path, commit, text in scripts:
            for line in text.splitlines():
                s = line.strip().rstrip('\\').strip()
                if re.search(re.escape(flag) + r'(?![\w-])', s) and not s.startswith('#') and s not in [h[2] for h in hits]:
                    hits.append((path, commit, s))
        if hits:
            for path, commit, s in hits[:6]:
                rows.append((name, 'DRAFT read the value from the quote', '%s@%s' % (path, commit), s))
            continue
        if not ttext:
            continue
        m = re.search(r"^\s*(p\.add_argument\('%s'.*)$" % re.escape(flag), ttext, re.M)
        if not m:
            continue                                  # the trainer of that day had no such option
        d = re.search(r'default=([^,)]+)', m[1])
        if 'store_true' in m[1]:
            rows.append((name, 'DRAFT off (the flag was not given)', '%s@%s' % (trainer, tcommit), m[1].strip()))
        elif d and d[1].strip() != 'None':
            rows.append((name, 'DRAFT default %s' % d[1].strip(), '%s@%s' % (trainer, tcommit), m[1].strip()))
        elif flag in FILLED:
            f = re.search(r'^\s*(%s.*)$' % re.escape(FILLED[flag]), ttext, re.M)
            if f:
                rows.append((name, 'DRAFT filled in by the quoted line', '%s@%s' % (trainer, tcommit),
                             f[1].split('  #')[0].strip()))
        # a default of None with no fill-in line means "not used": no row
    return rows, notes


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('plan')
    ap.add_argument('record', type=int)
    ap.add_argument('name')
    ap.add_argument('--script', action='append', default=[])
    ap.add_argument('--trainer', default='sim/ppo_run.py')
    ap.add_argument('--at', default=None, help='commit to read the scripts and the trainer at')
    ap.add_argument('--src', default=str(Path(__file__).resolve().parent.parent / 'SteveTheBot'))
    a = ap.parse_args()
    src = Path(a.src)
    plan = src / 'notes' / 'experiments' / a.plan
    head = records.header(plan)
    if not head or 'site' not in head or not 1 <= a.record <= len(head['site']):
        sys.exit('%s has no record number %d' % (a.plan, a.record))
    rec = head['site'][a.record - 1]
    name = a.name if a.name.endswith('.md') else a.name + '.md'
    out = src.joinpath(*writeups.PUBLIC) / name
    if out.exists():
        sys.exit('%s exists already' % out)

    scripts, notes = [], []
    for path in a.script:
        commit = a.at or (git(src, 'log', '-1', '--format=%h', '--until=%s 23:59:59' % rec['date'], '--', path)
                          or '').strip()
        if not commit:
            commit = (git(src, 'log', '--format=%h', '--diff-filter=A', '--', path) or '').strip().split('\n')[-1]
            notes.append('# %s was first committed after %s (at %s): check that the script is the one that ran'
                         % (path, rec['date'], commit))
        text = git(src, 'show', '%s:%s' % (commit, path)) if commit else None
        if text is None:
            sys.exit('%s is not in git (commit %r)' % (path, commit))
        scripts.append((path, commit, text))
    rows, more = setup_rows(src, scripts, a.trainer)
    notes += more

    models = [str(m) for v in rec.get('variants') or [] for m in v['models']]
    has_logs = any(writeups._train_log(src, m) for m in models)
    fm = ['---', 'expectation:', "  written: 'DRAFT YYYY-MM-DD'", '  quotes:',
          "  - 'DRAFT copy the expectation word for word from the plan file (the build checks it)'", 'setup:']
    fm += notes
    for n, v, s, q in rows:
        fm += ['- name: %s' % n, '  value: %s' % v, '  source: %s' % s, '  quote: %s' % yq(q)]
    fm += ['- name: Machine', '  value: DRAFT', "  checked: 'DRAFT how and when it was read on the machine'",
           'sources:']
    for path, commit, _t in scripts:
        fm.append('- {what: DRAFT, file: %s, commit: %s}' % (path, commit))
    if scripts:
        fm.append('- {what: The trainer, file: %s, commit: %s}' % (a.trainer, scripts[0][1]))
    fm.append('---')
    body = ['## Abstract', '', '{{abstract}}', '', '## Question and hypothesis', '',
            'DRAFT the question in two or three sentences, for a reader who does not know the project.', '',
            '{{expectation}}', '', 'DRAFT what the terms in the quotes mean.', '', '## Setup', '',
            'DRAFT the design in two or three sentences: the variants, the runs of each, the control.', '',
            '{{setup}}', '']
    if has_logs:
        body += ['{{runs}}', '']
    body += ['DRAFT how the models were scored (which runs, which opponents).', '', '## Results', '']
    if rec.get('cols') and rec.get('variants'):
        body += ['{{scores}}', '', '{{plots}}', '']
    if has_logs:
        body += ['{{training entropy | DRAFT caption.}}', '']
    if rec.get('facts') or rec.get('facts_file'):
        body += ['{{facts}}', '']
    body += ['{{games}}', '', '## Discussion', '',
             '**DRAFT one claim.** Numbers only through {{win C V}}, {{won C V}}, {{fact R C}} or '
             '{{cell path n R C}}; check each sentence against the built tables.', '', '## Limitations', '',
             '- DRAFT', '', '## Decision', '', '{{decision}}', '', '## Reproduction', '', '{{sources}}', '',
             'The trainer needs the Melee simulator the project runs on, which has no licence grant and is not '
             'published.', '']
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text('\n'.join(fm + body), encoding='utf-8', newline='\n')
    print('wrote %s: %d setup rows drafted' % (out, len(rows)))
    print('next: 1. add to the record "%s" in %s:   writeup: %s' % (rec['title'], a.plan, name))
    print('      2. replace every DRAFT (the build refuses the word), delete rows that do not apply')
    print('      3. python build.py, print the page as text, check every sentence against its tables')


if __name__ == '__main__':
    main()
