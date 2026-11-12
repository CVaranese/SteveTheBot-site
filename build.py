#!/usr/bin/env python3
"""Collect SteveTheBot's viewable pages into this folder and rebuild index.html.

    python build.py [path to the SteveTheBot checkout, default ../SteveTheBot]

Copies:
  notes/upgrade-map.html   -> roadmap.html          (the roadmap and progress page)
  logs/t28/view_*.html     -> scenarios/            (scenario playback: sample starts per model)
  logs/t18/*.html          -> reports/              (game report timelines, one game each)
Then commit and push; GitHub Pages serves the main branch.
"""
import html
import shutil
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else HERE.parent / 'SteveTheBot'
HEAD = '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">' \
       '<meta name="viewport" content="width=device-width,initial-scale=1"></head><body>\n'

STYLE = """
:root{--bg:#f3f3f8;--surface:#fff;--ink:#1b1a2e;--muted:#5d5c74;--line:#d9d8e6;--accent:#4b3fb0}
@media (prefers-color-scheme: dark){:root{--bg:#14131f;--surface:#1e1d2e;--ink:#ecebf7;--muted:#a3a1bd;
  --line:#34334a;--accent:#a79bff}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,sans-serif;padding:20px 16px 48px}
main{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:28px}
h1{font-size:1.6rem;margin:0;line-height:1.2}
h2{font-size:1.1rem;margin:0 0 4px}
p{margin:0;color:var(--muted)}
a{color:var(--accent)}
ul{list-style:none;margin:8px 0 0;padding:0;background:var(--surface);border:1px solid var(--line);border-radius:6px}
li{padding:10px 14px;display:flex;flex-wrap:wrap;gap:2px 12px;justify-content:space-between}
li + li{border-top:1px solid var(--line)}
li span{color:var(--muted);font-size:.85rem}
.big{display:block;background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:14px;
  font-weight:600;text-decoration:none}
.big span{display:block;font-weight:400;color:var(--muted);font-size:.9rem}
footer{color:var(--muted);font-size:.85rem}
"""


def copy_pages(src_dir, pattern, dest):
    out = HERE / dest
    out.mkdir(exist_ok=True)
    for old in out.glob('*.html'):
        old.unlink()
    pages = sorted(src_dir.glob(pattern)) if src_dir.is_dir() else []
    for p in pages:
        shutil.copyfile(p, out / p.name)
    return [(dest + '/' + p.name, p) for p in pages]


def label(path):
    """'view_A_vs_B.html' or 'A_vs_B_seed1000.html' -> ('A', 'against B')."""
    stem = path.stem
    seed = ''
    if stem.startswith('view2_'):
        stem, seed = stem[6:], ', six scenarios (version 2)'
    elif stem.startswith('view_'):
        stem, seed = stem[5:], ', three scenarios (version 1)'
    if '_seed' in stem:
        stem, seed = stem.rsplit('_seed', 1)
        seed = ', seed ' + seed
    a, _, b = stem.partition('_vs_')
    return a, 'against ' + b.replace('_', ' ') + seed


def listing(pages):
    rows = []
    for href, p in pages:
        name, rest = label(p)
        day = time.strftime('%d %b %Y', time.localtime(p.stat().st_mtime))
        rows.append('<li><a href="%s">%s</a><span>%s · %s</span></li>' % (
            html.escape(href), html.escape(name), html.escape(rest), day))
    return '<ul>\n' + '\n'.join(rows) + '\n</ul>' if rows else '<p>None yet.</p>'


def main():
    roadmap = SRC / 'notes' / 'upgrade-map.html'
    has_roadmap = roadmap.is_file()
    if has_roadmap:
        text = roadmap.read_text(encoding='utf-8')
        if '<!doctype' not in text[:200].lower():
            text = HEAD + text + '\n</body></html>\n'
        (HERE / 'roadmap.html').write_text(text, encoding='utf-8')
    scenarios = copy_pages(SRC / 'logs' / 't28', 'view*.html', 'scenarios')
    reports = copy_pages(SRC / 'logs' / 't18', '*.html', 'reports')
    page = HEAD.replace('</head>', '<title>SteveTheBot</title><style>%s</style></head>' % STYLE) + """<main>
<header><h1>SteveTheBot</h1>
<p>A Captain Falcon that learns Super Smash Bros. Melee by reinforcement learning, on the way to Project+.
Code: <a href="https://github.com/CVaranese/SteveTheBot">github.com/CVaranese/SteveTheBot</a>.</p></header>
%s
<section><h2>Scenario playback</h2>
<p>A few saved positions per skill, played on by one model. The same positions on every page of a version.
Version 2 adds whiff punish, first hit from neutral and shielding a move, and judges edgeguards by outcome.
Drawn as blocks, not character animations.</p>
%s</section>
<section><h2>Game reports</h2>
<p>One whole game as a timeline: what the model did, which inputs could have mattered, attacks and openings.
These pages are 1 to 2 MB each.</p>
%s</section>
<footer>Rebuilt %s.</footer>
</main></body></html>
""" % ('<a class="big" href="roadmap.html">Roadmap and progress<span>What each part of the system is now, what '
       'each change bought, and how the trainer works.</span></a>' if has_roadmap else '',
       listing(scenarios), listing(reports), time.strftime('%d %b %Y'))
    (HERE / 'index.html').write_text(page, encoding='utf-8')
    (HERE / '.nojekyll').write_text('', encoding='utf-8')
    print('roadmap: %s, scenario pages: %d, game reports: %d' % (has_roadmap, len(scenarios), len(reports)))


if __name__ == '__main__':
    main()
