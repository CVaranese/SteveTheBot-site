#!/usr/bin/env python3
"""Collect SteveTheBot's viewable pages into this folder and rebuild index.html.

    python build.py [path to the SteveTheBot checkout, default ../SteveTheBot]

Writes:
  roadmap.html     from notes/upgrade-map.html (the roadmap and progress page)
  anim/            scenario playback with character animation, from logs/t28/anim*.html, rendered again with
                   sim/scenario_anim_page.html; the recordings they play in anim/traces/
  reports/         game report timelines, from logs/t18/*.html, rendered again with sim/game_report_page.html
                   (animated replay when the report holds the animation data, blocks otherwise)
  viewer/          the slippi-viewer build (MIT) and Captain Falcon's display files, shared by anim/ and reports/
  scenarios/       old addresses of the block-drawn scenario pages, now forwarding to the animated ones
  index.html       the start page
Every page gets the same bar at the top: links to the start page and the roadmap, and a page finder.
Then commit and push; GitHub Pages serves the main branch.
"""
import html
import json
import re
import shutil
import sys
import time
from pathlib import Path

import catalog
import rankings
from names import NAME_PARTS, explain, show

HERE = Path(__file__).resolve().parent
SRC = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else HERE.parent / 'SteveTheBot'
HEAD = '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">' \
       '<meta name="viewport" content="width=device-width,initial-scale=1"></head><body>\n'
VIEWER_SRC = SRC / 'logs' / 'msl_viewer' / 'slippi-viewer'

STYLE = """
:root{--bg:#f3f3f8;--surface:#fff;--ink:#1b1a2e;--muted:#5d5c74;--line:#d9d8e6;--accent:#4b3fb0}
@media (prefers-color-scheme: dark){:root{--bg:#14131f;--surface:#1e1d2e;--ink:#ecebf7;--muted:#a3a1bd;
  --line:#34334a;--accent:#a79bff}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,sans-serif;padding:20px 16px 48px}
main{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:28px}
h1{font-size:1.6rem;margin:0;line-height:1.2}
h2{font-size:1.1rem;margin:0 0 4px}
h3{font-size:.95rem;margin:14px 0 0}
p{margin:0;color:var(--muted)}
a{color:var(--accent)}
ul{list-style:none;margin:8px 0 0;padding:0;background:var(--surface);border:1px solid var(--line);border-radius:6px}
li{padding:10px 14px;display:flex;flex-wrap:wrap;gap:2px 12px;justify-content:space-between}
li + li{border-top:1px solid var(--line)}
li span{color:var(--muted);font-size:.85rem}
.legend li{display:block}
.legend b{display:block}
.legend span{display:block;color:var(--muted);font-size:.9rem}
details{margin-top:10px} summary{cursor:pointer;color:var(--muted);font-size:.9rem}
.big{display:block;background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:14px;
  font-weight:600;text-decoration:none}
.big span{display:block;font-weight:400;color:var(--muted);font-size:.9rem}
footer{color:var(--muted);font-size:.85rem}
"""

# The bar on top of every page (STYLE.md, "The page bar"). Fixed to the top edge of the window, full width, one
# height on every page, with a spacer of the same height, so the page's own padding and layout never move it.
# Its own class names and colours, so it looks the same whatever the page's style.
NAV_H = 48
NAV_STYLE = """<style>
.stb-nav{--n-bg:#ffffff;--n-ink:#1b1a2e;--n-line:#d9d8e6;--n-acc:#4b3fb0;
  position:fixed;top:0;left:0;right:0;z-index:1000;height:%(h)dpx;background:var(--n-bg);
  border-bottom:1px solid var(--n-line);font:500 14px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--n-ink);box-sizing:border-box}
@media (prefers-color-scheme: dark){.stb-nav{--n-bg:#1e1d2e;--n-ink:#ecebf7;--n-line:#34334a;--n-acc:#a79bff}}
.stb-nav *{box-sizing:border-box}
.stb-nav .stb-in{max-width:1100px;height:100%%;margin:0 auto;padding:0 16px;display:flex;align-items:center;gap:16px}
.stb-nav a{color:var(--n-acc);text-decoration:none;white-space:nowrap}
.stb-nav a.stb-home{color:var(--n-ink);font-weight:700}
.stb-nav a[aria-current="page"]{text-decoration:underline;text-underline-offset:4px}
.stb-nav select{font:400 14px system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--n-ink);background:var(--n-bg);
  border:1px solid var(--n-line);border-radius:6px;height:34px;padding:0 8px;margin-left:auto;min-width:0;
  max-width:340px;flex:0 1 340px}
.stb-space{height:%(h)dpx}
html{scroll-padding-top:%(h)dpx}
@media (max-width:640px){.stb-nav .stb-link{display:none}.stb-nav select{flex:1 1 auto;max-width:none}}
</style>""" % {'h': NAV_H}

# What the model names mean: names.py (STYLE.md, "Model names"). Every model a page shows must be explained there,
# or the build stops.
SHOWN = set()   # every model name a built page shows, checked with names.explain


def names_section():
    parts = ''.join('<li><b>%s</b><span>%s</span></li>' % (html.escape(k), html.escape(v)) for k, v in NAME_PARTS)
    used = sorted(set(show(n) for n in SHOWN), key=lambda n: (n.startswith('scripted'), n.lower()))
    rows = ''.join('<li><b>%s</b><span>%s</span></li>' % (html.escape(n), html.escape(explain(n))) for n in used)
    return ('<section id="names"><h2>Model names</h2><p>What the names on these pages mean. The models in the '
            'rankings are explained on the <a href="rankings.html#names">rankings page</a>.</p>\n'
            '<h3>Parts of a name</h3>'
            '<ul class="legend">%s</ul>\n<h3>The models on this site</h3><ul class="legend">%s</ul></section>'
            % (parts, rows))


def check_names(names):
    missing = sorted(n for n in set(show(n) for n in names) if not explain(n))
    if missing:
        raise SystemExit('no explanation in names.py (NAMES or PATTERNS) for: %s' % ', '.join(missing))


def nav(root, here, groups):
    """root: the path from this page to the site root ('' or '../'); here: this page's path from the root;
    groups: [(group title, [(path from root, label)])]."""
    def link(path, text, cls=' class="stb-link"'):
        cur = ' aria-current="page"' if path == here else ''
        return '<a%s href="%s%s"%s>%s</a>' % (cls, root, path, cur, text)
    opts = ['<option value="">Go to page...</option>']
    for title, pages in groups:
        if not pages:
            continue
        opts.append('<optgroup label="%s">' % html.escape(title))
        for path, text in pages:
            sel = ' selected' if path == here else ''
            opts.append('<option value="%s%s"%s>%s</option>' % (root, html.escape(path), sel, html.escape(text)))
        opts.append('</optgroup>')
    return ('<nav class="stb-nav" aria-label="Site"><div class="stb-in">' +
            link('index.html', 'SteveTheBot', ' class="stb-home"') +
            link('roadmap.html', 'Roadmap') + link('rankings.html', 'Rankings') + link('catalog.html', 'Catalog') +
            link('index.html#scenarios', 'Scenarios') +
            link('index.html#reports', 'Game reports') + link('index.html#names', 'Model names') +
            '<select aria-label="Go to page" onchange="if(this.value)location.href=this.value">' + ''.join(opts) +
            '</select></div></nav><div class="stb-space"></div>\n')


def add_nav(path, groups):
    """Put the bar at the top of the page's body, and its style in the head."""
    rel = path.relative_to(HERE).as_posix()
    root = '../' * rel.count('/')
    text = path.read_text(encoding='utf-8')
    text = text.replace('</head>', NAV_STYLE + '</head>', 1)
    text, n = re.subn(r'(<body[^>]*>)', lambda m: m.group(1) + '\n' + nav(root, rel, groups), text, count=1)
    if not n:
        raise SystemExit('%s: no <body> tag for the page bar' % rel)
    path.write_text(text, encoding='utf-8')


def viewer_files():
    """viewer/: the slippi-viewer build (MIT, licence beside it) and the character display files."""
    out = HERE / 'viewer'
    if out.exists():
        shutil.rmtree(out)
    if not (VIEWER_SRC / 'dist' / 'index.js').is_file():
        return False
    (out / 'public' / 'zips').mkdir(parents=True)
    shutil.copyfile(VIEWER_SRC / 'dist' / 'index.js', out / 'index.js')
    shutil.copyfile(VIEWER_SRC / 'LICENSE', out / 'LICENSE')
    for z in (VIEWER_SRC / 'public' / 'zips').glob('*.zip'):
        shutil.copyfile(z, out / 'public' / 'zips' / z.name)
    return True


def site_paths(template):
    """The templates point at the local viewer build (logs/msl_viewer); on the site it is viewer/."""
    return template.replace('../msl_viewer/slippi-viewer/dist/index.js', '../viewer/index.js') \
                   .replace('../msl_viewer/slippi-viewer/public', '../viewer/public')


def animated_pages():
    """anim/: the scenario samples with character animation, rendered again from the current template with each
    page's data; the recordings they play are copied beside them."""
    out = HERE / 'anim'
    if out.exists():
        shutil.rmtree(out)
    pages = sorted((SRC / 'logs' / 't28').glob('anim*.html'))
    if not pages:
        return []
    (out / 'traces').mkdir(parents=True)
    template = site_paths((SRC / 'sim' / 'scenario_anim_page.html').read_text(encoding='utf-8'))
    done = []
    for p in pages:
        m = re.search(r'const D = (\{.*?\});\n', p.read_text(encoding='utf-8'), re.S)
        if not m:
            continue
        data = json.loads(m.group(1))
        for s in data['samples']:
            shutil.copyfile(SRC / 'logs' / 't28' / s['file'], out / s['file'])
            # 'A_c04 vs 9' -> 'A against scripted bot level 9' (the game the start position was saved from)
            pair = [('scripted bot level ' + x if x.isdigit() else x) for x in s['from'].split(' vs ')]
            SHOWN.update(pair)
            s['from'] = ' against '.join(show(x) for x in pair)
        SHOWN.update([data['model'], data['opponent']])
        data['model'], data['opponent'] = show(data['model']), show(data['opponent'])
        (out / p.name).write_text(template.replace('/*DATA*/null', json.dumps(data, separators=(',', ':'))),
                                  encoding='utf-8')
        done.append(('anim/' + p.name, p))
    return done


def report_pages():
    """reports/: the game reports, rendered again from the current template with each page's own data."""
    out = HERE / 'reports'
    if out.exists():
        shutil.rmtree(out)
    out.mkdir()
    template = site_paths((SRC / 'sim' / 'game_report_page.html').read_text(encoding='utf-8'))
    done = []
    for p in sorted((SRC / 'logs' / 't18').glob('*.html')):
        data = None
        for line in p.read_text(encoding='utf-8').splitlines():
            if line.startswith('const D = ') and line.rstrip().endswith(';'):
                data = line[len('const D = '):].rstrip()[:-1]
                break
        if data is None or data == '"__DATA__"':
            continue
        d = json.loads(data)
        SHOWN.update(d['players'])
        d['players'] = [show(x) for x in d['players']]
        d['title'] = ' against '.join(d['players'])
        data = json.dumps(d, separators=(',', ':'), ensure_ascii=False)
        (out / p.name).write_text(template.replace('"__DATA__"', data, 1), encoding='utf-8')
        done.append(('reports/' + p.name, p))
    return done


def forward_block_pages(animated):
    """scenarios/: the block-drawn pages are gone from the site (the animated pages show the same samples); their
    old addresses forward to the animated page of the same model and version."""
    out = HERE / 'scenarios'
    if out.exists():
        shutil.rmtree(out)
    out.mkdir()
    for href, p in animated:
        name = 'view' + p.name[len('anim'):]
        target = '../' + href
        (out / name).write_text(
            HEAD.replace('</head>', '<title>Moved</title><meta http-equiv="refresh" content="0; url=%s">'
                         '<link rel="canonical" href="%s"></head>' % (target, target)) +
            '<p>This page moved to <a href="%s">%s</a>.</p>\n</body></html>\n' % (target, target),
            encoding='utf-8')


def label(path):
    """'view_A_vs_B.html' or 'A_vs_B_seed1000.html' -> ('A', 'against B')."""
    stem = path.stem
    seed = ''
    if stem.startswith(('view2_', 'anim2_')):
        stem, seed = stem[6:], ', six scenarios (version 2)'
    elif stem.startswith(('view_', 'anim_')):
        stem, seed = stem[5:], ', three scenarios (version 1)'
    if '_seed' in stem:
        stem, seed = stem.rsplit('_seed', 1)
        seed = ', seed ' + seed
    a, _, b = stem.partition('_vs_')
    return show(a), 'against ' + show(b) + seed


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
    has_viewer = viewer_files()
    animated = animated_pages() if has_viewer else []
    reports = report_pages()
    forward_block_pages(animated)
    check_names(SHOWN)
    model_pages = {}   # shown model name -> its scenario and report pages, linked from the rankings
    for href, p in sorted(animated, key=lambda a: not a[1].name.startswith('anim2_')) + reports:
        name, rest = label(p)
        if href.startswith('anim/'):
            short = 'Scenarios' + (' v1' if not p.name.startswith('anim2_') else '')
            long_ = 'Scenarios' + (' (version 1)' if not p.name.startswith('anim2_') else '') + ' ' + \
                rest.split(',')[0]
        else:
            short, long_ = 'Game ' + rest.split(',')[0].replace('against ', 'vs '), 'Game report ' + rest
        model_pages.setdefault(name, []).append((href, short, long_))
    ranked = rankings.build(HERE, SRC, HEAD, STYLE, model_pages)
    check_names(ranked)
    check_names(catalog.build(HERE, SRC, HEAD, STYLE, model_pages))
    v2 =[a for a in animated if a[1].name.startswith('anim2_')]
    v1 = [a for a in animated if not a[1].name.startswith('anim2_')]

    page = HEAD.replace('</head>', '<title>SteveTheBot</title><style>%s</style></head>' % STYLE) + """<main>
<header><h1>SteveTheBot</h1>
<p>A Captain Falcon that learns Super Smash Bros. Melee by reinforcement learning, on the way to Project+.
Code: <a href="https://github.com/CVaranese/SteveTheBot">github.com/CVaranese/SteveTheBot</a>.</p></header>
%s
<section id="scenarios"><h2>Scenario playback</h2>
<p>Saved positions per skill (edgeguard, recovery, follow-up, whiff punish, first hit, shielding), played on by one
model against the same opponent. Every page of a version uses the same positions, so models can be compared
sample by sample. The model is player 1.</p>
%s
<details><summary>Version 1 (three scenarios, superseded)</summary>
%s</details></section>
<section id="reports"><h2>Game reports</h2>
<p>One whole game as a timeline: what the model did, which inputs could have mattered, attacks and openings, with
the game itself playing beside it. These pages are 1 to 3 MB each.</p>
%s</section>
%s
<footer>Gameplay is drawn with <a href="https://github.com/gcpreston/slippi-viewer">slippi-viewer</a> (MIT).
Rebuilt %s.</footer>
</main></body></html>
""" % (('<a class="big" href="roadmap.html">Roadmap and progress<span>What each part of the system is now, what '
        'each change bought, and how the trainer works.</span></a>\n' if has_roadmap else '') +
       '<a class="big" href="catalog.html">How the bot got here<span>One model per change made to the bot, in '
       'order, each scored on every yardstick, with links to watch it play.</span></a>\n'
       '<a class="big" href="rankings.html">Rankings<span>The best models so far, one ranking per opponent, from '
       'every scored game.</span></a>',
       listing(v2), listing(v1), listing(reports), names_section(), time.strftime('%d %b %Y'))
    (HERE / 'index.html').write_text(page, encoding='utf-8')
    (HERE / '.nojekyll').write_text('', encoding='utf-8')

    def entries(pages, scenario):
        out = []
        for href, p in pages:
            name, rest = label(p)
            # 'A, version 2' for scenario pages, 'A (against B)' for reports: the closed select shows only this
            out.append((href, name + (', ' + rest.split('(')[-1].rstrip(')') if scenario
                                      else ' (' + rest.split(', ')[0] + ')')))
        return out
    groups = [('Start', [('index.html', 'Start page')] + ([('roadmap.html', 'Roadmap and progress')]
                                                           if has_roadmap else []) +
               [('rankings.html', 'Rankings'), ('catalog.html', 'Model catalog')]),
              ('Scenarios, version 2', entries(v2, True)),
              ('Scenarios, version 1', entries(v1, True)),
              ('Game reports', entries(reports, False))]
    for path in [HERE / 'index.html', HERE / 'rankings.html', HERE / 'catalog.html'] +([HERE / 'roadmap.html'] if has_roadmap else []) + \
            [HERE / h for h, _ in animated + reports]:
        add_nav(path, groups)
    print('roadmap: %s, animated scenario pages: %d, game reports: %d' % (has_roadmap, len(animated), len(reports)))


if __name__ == '__main__':
    main()
