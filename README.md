# SteveTheBot site

Viewable pages for [SteveTheBot](https://github.com/CVaranese/SteveTheBot), served by GitHub Pages at
https://cvaranese.github.io/SteveTheBot-site/ .

- `index.html`: the start page.
- `roadmap.html`: the roadmap and progress page.
- `anim/`: scenario playback with character animation (saved start positions per model), recordings in
  `anim/traces/`.
- `reports/`: game report timelines, with the game playing beside the timeline.
- `viewer/`: the [slippi-viewer](https://github.com/gcpreston/slippi-viewer) build (MIT, `viewer/LICENSE`) that draws
  the gameplay on both, and Captain Falcon's display files.
- `scenarios/`: old addresses of the block-drawn scenario pages; they forward to `anim/`.

Every page has the same bar at the top: links to the start page and the roadmap, and a page finder. The rules every
page follows (bar, colours, layout, model names) are in [STYLE.md](STYLE.md).

To update: `python build.py` (renders the current pages from a SteveTheBot checkout beside this folder and rebuilds
`index.html`), then commit and push.
