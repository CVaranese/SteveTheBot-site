# Site style guide

Rules every page on this site follows. `build.py` applies the ones marked *(build)* itself; the rest are for whoever
writes a page template (in the SteveTheBot repo: `sim/scenario_anim_page.html`, `sim/game_report_page.html`,
`notes/upgrade-map.html`). Update this file when a rule changes.

## The page bar *(build)*

- Every page except the forwarding stubs in `scenarios/` gets the same bar, inserted by `build.py` right after
  `<body>`: SteveTheBot (start page), Roadmap, Experiments, Rankings, Catalog, Scenarios, Game reports, Model names, and a "Go to page"
  list of every page, grouped.
- Fixed to the top edge of the window, full width, **48 px high on every page and every screen width**, followed by
  a 48 px spacer, so a page's own padding or layout never moves it. Contents sit in a centred column 1100 px wide.
- Under 640 px wide only "SteveTheBot" and the page list show (the list holds every other link), so the bar never
  wraps to a second line.
- The bar has its own class names (`stb-*`) and colours, so page styles cannot change it. A page must not use
  `position: fixed` or sticky elements at `top: 0`, or class names starting with `stb-`.
- The current page is underlined in the bar and selected in the list.

## Colours and type

- Light and dark follow the reader's system setting (`prefers-color-scheme`); every page supports both.
- Site tokens (start page, bar, scenario pages): background `#f3f3f8` / dark `#14131f`, surface `#fff` / `#1e1d2e`,
  ink `#1b1a2e` / `#ecebf7`, muted `#5d5c74` / `#a3a1bd`, lines `#d9d8e6` / `#34334a`, accent `#4b3fb0` / `#a79bff`.
  Good / bad results: `#1f8f61` / `#4fcf9a` and `#c63b3b` / `#f07a7a`.
- Type: the system sans-serif stack (`system-ui, -apple-system, "Segoe UI", sans-serif`); the roadmap adds Inter,
  Space Grotesk and JetBrains Mono from Google Fonts.
- Game reports keep their own chart palette (player 1 blue, player 2 orange). The animated viewer always draws
  port 1 red and port 2 blue; any page that shows it says which player is which colour under the viewer.

## Layout

- Phone first: everything works at 360 px wide, 16 px side margins, no sideways scrolling of the page (wide tables
  scroll inside their own box).
- One reading column: 760 px (start page), 900 px (scenario pages), 1100 px (game reports, bar).
- Cards: surface background, 1 px line border, 6 to 10 px corner radius.

## Gameplay

- All gameplay is drawn with the animated viewer in `viewer/` (slippi-viewer, MIT, our build with the `framechange`
  event, see `sim/viewer_framechange.md` in the SteveTheBot repo). No block drawings on the site.
- Pages reference it as `../viewer/index.js` and `../viewer/public` *(build: rewritten from the local
  `../msl_viewer/...` paths)*.
- When a page has its own timeline, the viewer and the timeline move together both ways.

## Model names *(build)*

- Names are shown **without the checkpoint suffix** (`_c04`, `_c08`): every model on the site is the copy saved at
  the end of its training run. File names and addresses keep the suffix. A model that is not from the end of its
  run must say where it is from in its legend entry.
- Every model a page names (including the games scenario starts were saved from, and every ranked model) needs an
  explanation in `names.py`: an exact entry in `NAMES` or a family in `PATTERNS`; the build stops otherwise. The
  start page's "Model names" section shows the name parts (`NAME_PARTS`) and the models of the scenario and report
  pages; the rankings page lists its own models at the bottom, and each ranked name links there. Write each entry so it makes sense without knowing the code: what was trained,
  how it differs from its neighbour, the seed.
- The scripted bot is written out: "scripted bot level 9".

## Rankings *(build)*

- `rankings.html` is built by `rankings.py` from the score logs, never typed by hand: `logs/yardstick.csv`
  (simulator, written by `sim/eval_vs_bot.py`) and every `logs/**/*_cpu9_games.csv` (Dolphin, `run.py
  --games-log`). Copy WSL rows of `yardstick.csv` back before building, or new scores are missing.
- One ranking per opponent, in `BOARDS`: the level 9 in-game CPU in Dolphin first (the real game), then the
  simulator opponents from hardest to easiest. Retired yardsticks stay, folded.
- Only end-of-run models are ranked; repeated score runs are pooled; a model needs a minimum number of games
  (20 in Dolphin, 50 in the simulator). Ranked by share won, then stock lead; rankings where most models win
  nearly every game (`BY_LEAD`) go by stock lead first. Each ranking states the chance error for its usual number
  of games.
- A new opponent: add a `BOARDS` row with a plain description. A new model family: add an entry or pattern in
  `names.py`.

- Head-to-head scores (one model against a frozen model that is not a ranking opponent) are listed newest first
  under the rankings, not ranked.

## Experiments *(build)*

- `experiments.html` is built by `experiments.py`: one entry per experiment in `EXPERIMENTS` (task ids, date,
  question in one line, variants with their models, score columns, verdict, decision), newest first. The text is
  kept by hand; the score cells are filled from the same score logs as the rankings, so new scores of a listed
  model appear on the next build. A model not scored yet shows a dash.
- **Every finished task that trains, scores or measures something adds its entry.** The build stops when a score
  log holds a task number no entry covers, or an end-of-run model no entry lists.
- Score cells are games won of 100, pooled over the variant's runs, with the single runs in small type below.
  Results not in the score logs (imitation accuracy, scenario shares, speeds) go in the entry's `facts` table.
- Public page: summaries and numbers only, never raw notes, local paths, replay player names or connect codes.

## Before a push

- `python build.py` runs without errors (it checks the names and the bar).
- New pages hold no local paths, replay player names or connect codes, and no simulator code or data.
- Look at one page of each kind (start page, roadmap, a scenario page, a game report) at phone and desktop width.
