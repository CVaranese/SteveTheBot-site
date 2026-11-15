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

## Nothing moves on a click

The user's rule (2026-11-15: "ensure the page stays static when I'm clicking (this goes for the future as well)").
A click on a tab, filter, legend entry or toggle changes only what it is about; nothing else on the page shifts,
resizes or reflows. For every interactive page:

- **Reserve the space.** A text that changes with the selection (a description, a note) keeps the height of its
  longest version: put every version in the same grid cell and show one (`stack()` in `curves.py`).
- **Lists of controls stay the same.** Tabs and legend entries that do not apply to the current selection are
  shown disabled with a short reason, not removed. A selected tab or button changes colour, never size (no
  change of font weight, border width or padding).
- **Graphs keep their scale.** Axes are sized from everything the current view could show, not from what is
  ticked, so hiding a line or a group of points never rescales the graph. The plot keeps its height.
- **What may move:** content below a folded section the reader opens, and a change of the whole view (another
  set of runs, another page section).
- Check before a push: click every tab and every legend entry and watch the rest of the page.

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
  explanation in `names.py`: an exact entry in `NAMES` or a family in `PATTERNS` (or, for a model in an
  experiment record, its variant's label); the build stops otherwise. The
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

## Training curves *(build)*

- `curves.html` is built by `curves.py` from `logs/yardstick.csv` and `logs/t43/curves.csv` (the user's request,
  2026-11-14: benchmarks as a graph, a point per checkpoint, a line per important model, one graph per opponent).
- One graph at a time. "Runs" picks a set of lines (`SETS`, at most 8 lines, usually 3 or 4); the buttons pick the
  benchmark (`BENCH`: an opponent, a pool of opponents, or the combined Elo number). A set or benchmark with no
  scored checkpoints is left out, so rows can be added before the scores exist.
- A line is one setting: the mean of its runs drawn thick with a marker per checkpoint, the single runs thin
  behind it. A line keeps its colour within its set whatever else is shown or hidden.
- X axis: training so far in million decisions by one player (`PER_CHECKPOINT` per run family), never the
  checkpoint number, so runs with different checkpoint spacing line up. Y axis: share of games won (0 to 100) or
  Elo. One Y axis only.
- Chart colours: the eight-colour categorical palette in `curves.py` (`--s1` to `--s8`, light and dark steps),
  checked for colour-blind separation on the site's surfaces. Text stays in ink and muted; colour only on marks.
- Every graph has a legend (click to hide a line), a hover readout, and the same numbers as a table. The legend
  is a list with one tick box per line in the line's colour, the name in ink and one muted line under it (how
  many runs, or why it is not shown); a hidden line has an empty box, no strike-through.
- Landmark models (Highlights set only) are single measured points; each gets a dashed line from untrained play
  (random play's score against that opponent, or 0) that is drawn, not measured, and the legend says so.
- A graph is linked as `curves.html#<set key>/<benchmark key>` (for example `#t43/elo`); experiment entries link
  their graphs with the `graphs` field.
- A new run family: a `SETS` row, a `PER_CHECKPOINT` row, and its `names.py` pattern.

## Experiments *(build)*

- `experiments.html` is built by `experiments.py` from **experiment records** (since 2026-11-15, T-35; the user:
  "record our test results in a standardized way so that it auto updates the site"): the header block (front
  matter) of each plan file `notes/experiments/<date>-<slug>.md` in the main repo, read by `records.py` (the
  field list is its docstring). Only the header is public; the plan body stays private. One plan file may hold
  several records (`site:` is a list). The score cells are filled from the same score logs as the rankings, so
  new scores of a listed model appear on the next build; no score table is typed by hand. A model not scored yet
  shows a dash.
- Template of a record (paste at the very top of the plan file):

  ```yaml
  ---
  site:
  - title: A few words
    date: '2026-11-15'            # day the results came in
    tasks: [T-48]
    topic: controls               # a key of TOPICS
    short: The result in one line.
    question: The question in one line?
    cols: [pool2, cpu9, {vs: Frozen T4HumP1, models: [T4HumP1], seeds: 1000}]
    variants:
    - what: What was tried (one setting, its seeds in one row)
      models: [T48As1_c04, T48As2_c04]
    # optional: assessment (only rows scored with ASSESSMENT=<id>), graphs [{text, href}],
    # facts {head, rows} or facts_file {path, table}, watch [models], no_game reason, rescore: true
    verdict: What the scores say.
    decision: What the user decided (or what is pending).
  ---
  ```
- Score with `ASSESSMENT=<plan file name without .md> python sim/eval_vs_bot.py ...` when a record should count
  only its own rows (for example a re-score with new seeds); without it, every row of a listed model counts.
- A model with no `names.py` entry is explained by the `what` label of its variant; a `names.py` entry still
  wins and is better for model families shown on several pages.
- Publishing is one command in the main repo: `bash tools/publish.sh` (copies new WSL score rows back, builds,
  runs the safety check `tools/site_check.py`, commits and pushes this repo). `PUBLISH_DRY=1` stops before the
  commit. Dolphin game logs are copied into `logs/` by hand first.
- Three sections, in this order (the user's request, 2026-11-13: the page was "a lot of unsorted data"):
  **Recent experiments** (the newest `RECENT` entries, one result line each), **By what was tested** (every entry
  under its subject from `TOPICS`, folded: only date, title and the result line show until opened), **Model
  evaluations** (one row per model with its scores against the `EVAL_COLS` opponents and its watch links;
  filter by name, subject, or "has something to watch"; sort by a column).
- Every entry needs `topic` (a key of `TOPICS`; add a subject there when none fits) and `short` (the result in one
  line, answering the question); the build stops otherwise.
- Game pages (`reports/`) are for watching: the game on top, then moments to jump to and a few numbers; the
  timeline, the tables and the method are folded.
- **Every finished task that trains, scores or measures something writes its record header.** The build stops
  when a score log holds a task number no record covers, or an end-of-run model no record lists.
- Every variant needs a game page, except in a record with `rescore: true` (it only scores existing models again;
  the user, 2026-11-15: "Optional for rescores") or a `no_game` reason. A re-score record's models get no row of
  their own in Model evaluations and no watch links (their shown name is the run's end-of-run copy).
- Within one day, entries are ordered newest plan file first, then in the order written in the file.
- Score cells are games won of 100, pooled over the variant's runs, with the single runs in small type below.
  Results not in the score logs (imitation accuracy, scenario shares, speeds) go in the entry's `facts` table.
- Public page: summaries and numbers only, never raw notes, local paths, replay player names or connect codes.

## Before a push

- `python build.py` runs without errors (it checks the names and the bar).
- New pages hold no local paths, replay player names or connect codes, and no simulator code or data:
  `tools/site_check.py` in the main repo checks every changed file (`--all`: every file) and `tools/publish.sh`
  runs it before each push.
- Look at one page of each kind (start page, roadmap, a scenario page, a game report) at phone and desktop width.
