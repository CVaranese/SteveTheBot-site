# Site style guide

Rules every page on this site follows. `build.py` applies the ones marked *(build)* itself; the rest are for whoever
writes a page or a template (in the SteveTheBot repo: `sim/scenario_anim_page.html`, `sim/game_report_page.html`,
`notes/upgrade-map.html`). Update this file when a rule changes.

The site was rebuilt on 2026-11-16 (the user: "The style is too claude-default", "the tabs should be condensed and
merged and simplified where possible"): the look below, four tabs, the roadmap as the landing page.

## The four tabs *(build)*

- **Roadmap** (`index.html`, the landing page, from `notes/upgrade-map.html`), **Experiments**
  (`experiments.html`), **Models** (`models.html`, with the training curves `curves.html` as its second view),
  **Watch** (`watch.html`, every game and scenario page). `TABS` in `build.py`.
- A new page belongs to one of the four tabs. A new tab needs the user's yes.
- Old addresses forward: `roadmap.html` to `index.html`; `rankings.html` and `catalog.html` to `models.html`;
  `scenarios/*` to `anim/*`.

## The page bar *(build)*

- Every page gets the same bar, inserted by `build.py` right after `<body>`: "SteveTheBot" (the landing page) and
  the four tabs. The tab a page belongs to is marked with a red underline, so a game report marks "Watch".
- Fixed to the top edge of the window, full width, **48 px high on every page and every screen width**, followed
  by a 48 px spacer. Contents sit in a centred column 1180 px wide. It never wraps; on a narrow phone it scrolls
  sideways inside itself.
- The bar has its own class names (`stb-*`) and colours (`theme.NAV_STYLE`), so page styles cannot change it. A
  page must not use `position: fixed` or sticky elements at `top: 0`, or class names starting with `stb-`.

## Colours and type ("lab notebook", the user's choice 2026-11-16)

Defined once, in `theme.py` (`STYLE`); page builders add only what is theirs.

- Paper and ink, no cards: background `#faf8f3` / dark `#131416`, ink `#17181c` / `#e9e6df`, muted `#62646b` /
  `#9b9a94`, hairlines `#d9d5ca` / `#34352f`. Sections are separated by a 1 px rule (ink for a section start,
  hairline between rows), not by boxes or shadows.
- **One accent, red** (`#b3261e` / dark `#ff7a66`): link underlines, the current tab, sort arrows, small section
  labels, the best bar of a plot. Nothing else is coloured, except chart series.
- **No rounded corners**, no pills, no gradients, no drop shadows.
- Type: headings Newsreader (serif), text IBM Plex Sans, numbers, dates, task ids and model names IBM Plex Mono
  (Google Fonts, loaded by the bar's style). Small labels are 0.72 to 0.8 rem capitals with letter spacing.
- Light and dark follow the reader's system setting; every page supports both.
- Plot bars are neutral (`--bar`), the best one accent; a missing value is a dash in `--off`. Game reports keep
  their own chart palette (player 1 blue, player 2 orange). The animated viewer always draws port 1 red and port
  2 blue; any page that shows it says which player is which colour under the viewer.
- Not yet in this look: the roadmap, the game report template and the scenario template (their own styles, in the
  main repo).

## Layout

- Phone first: everything works at 360 px wide, 16 px side margins, no sideways scrolling of the page (wide tables
  scroll inside their own box).
- One column, 1180 px at most (`main`); running text is held to about 70 characters a line.

## Catalog tables (`theme.CATALOG`, `theme.CATALOG_JS`)

The experiments and models pages are the same kind of table:

- One row per thing, the result readable without opening it. Tap a row to open its detail under it; tap again to
  close. Tap a column heading to sort (the arrow shows the column and direction).
- Filters above the table: category buttons with counts, a search box, "Can be watched".
- **Watch buttons:** "Game" and "Scenarios" on every row. A page that exists is a solid button; one that does not
  is a dashed grey label with the reason as its tooltip. Never leave the button out.
- On a phone the experiments table stacks each row (date, task, category on one line, then title, result,
  buttons); the models table scrolls sideways.

## Nothing moves on a click

The user's rule (2026-11-15: "ensure the page stays static when I'm clicking (this goes for the future as well)").
A click on a tab, filter, legend entry or toggle changes only what it is about; nothing else on the page shifts,
resizes or reflows. For every interactive page:

- **Reserve the space.** A text that changes with the selection keeps the height of its longest version: put
  every version in the same grid cell and show one (`stack()` in `curves.py`).
- **Lists of controls stay the same.** Tabs and legend entries that do not apply are shown disabled with a short
  reason, not removed. A selected button changes colour, never size.
- **Graphs keep their scale.** Axes are sized from everything the current view could show, not from what is
  ticked. The plot keeps its height.
- **What may move:** content below a row or folded section the reader opens, the rows of a table when it is
  filtered or sorted, and a change of the whole view.
- Check before a push: click every tab and every legend entry and watch the rest of the page.

## Gameplay

- All gameplay is drawn with the animated viewer in `viewer/` (slippi-viewer, MIT, our build with the
  `framechange` event, see `sim/viewer_framechange.md` in the SteveTheBot repo). No block drawings on the site.
- Pages reference it as `../viewer/index.js` and `../viewer/public` *(build: rewritten from the local
  `../msl_viewer/...` paths)*.
- When a page has its own timeline, the viewer and the timeline move together both ways.
- Game pages (`reports/`) are for watching: the game on top, then moments to jump to and a few numbers; the
  timeline, the tables and the method are folded.

## Model names *(build)*

- Names are shown **without the checkpoint suffix** (`_c04`, `_c08`): every model on the site is the copy saved at
  the end of its training run. File names and addresses keep the suffix. A model that is not from the end of its
  run must say where it is from in its explanation.
- Every model a page names needs an explanation in `names.py`: an exact entry in `NAMES` or a family in
  `PATTERNS` (or, for a model in an experiment record, its variant's label); the build stops otherwise. The
  explanation is the model's row text on the Models page. Write it so it makes sense without knowing the code:
  what was trained, how it differs from its neighbour, the seed.
- The scripted bot is written out: "scripted bot level 9".

## Models *(build)*

- `models.html` is built by `models.py` from the score logs, never typed by hand: `logs/yardstick.csv`
  (simulator, `sim/eval_vs_bot.py`), every `logs/**/*_cpu9_games.csv` (Dolphin, `run.py --games-log`) and
  `logs/scenario.csv`. Copy WSL rows of `yardstick.csv` back before building.
- One row per end-of-run model, one column per fixed opponent (`models.COLS`; the opponents and the games a
  score needs are `BOARDS` in `rankings.py`, their texts `OPP` in `experiments.py`). Sorting by a column is that
  opponent's ranking; unscored models stay at the bottom. A model that is the opponent shows "ref.".
- "Milestones" filters to one model per change made to the bot, in order (`CATALOG` in `catalog.py`; add a model
  there to make it a milestone).
- A row's detail: what the model is, its milestone, the experiment it came from, games and stock lead per
  opponent, the six scenario scores, watch links.
- `rankings.py` and `catalog.py` are now libraries (score loaders, `BOARDS`, `CATALOG`, scenario scores); their
  own page builders are no longer called.
- A new opponent: a `BOARDS` row, an `OPP` entry, a `COLS` key.

## Training curves *(build)*

- `curves.html` (second view of the Models tab) is built by `curves.py` from `logs/yardstick.csv` and
  `logs/t43/curves.csv`: a point per checkpoint, a line per important setting, one graph per opponent.
- One graph at a time. "Runs" picks a set of lines (`SETS`, at most 8 lines, usually 3 or 4); the buttons pick the
  benchmark (`BENCH`). A set or benchmark with no scored checkpoints is left out.
- A line is one setting: the mean of its runs drawn thick with a marker per checkpoint, the single runs thin
  behind it. A line keeps its colour within its set whatever else is shown or hidden.
- X axis: training so far in million decisions by one player (`PER_CHECKPOINT` per run family), never the
  checkpoint number. Y axis: share of games won (0 to 100) or Elo. One Y axis only.
- Chart colours: the eight-colour categorical palette in `curves.py` (`--s1` to `--s8`, light and dark steps),
  checked for colour-blind separation. Text stays in ink and muted; colour only on marks.
- Every graph has a legend (click to hide a line), a hover readout, and the same numbers as a table.
- Landmark models (Highlights set only) are single measured points; each gets a dashed line from untrained play
  that is drawn, not measured, and the legend says so.
- A graph is linked as `curves.html#<set key>/<benchmark key>`; experiment records link theirs with `graphs`.
- A new run family: a `SETS` row, a `PER_CHECKPOINT` row, and its `names.py` pattern.

## Experiments *(build)*

- `experiments.html` is built by `experiments.py` from **experiment records**: the header block (front matter)
  of each plan file `notes/experiments/<date>-<slug>.md` in the main repo, read by `records.py` (the field list
  is its docstring). Only the header is public; the plan body stays private. One plan file may hold several
  records (`site:` is a list). Scores come from the score logs, so new scores of a listed model appear on the
  next build.
- Template of a record (paste at the very top of the plan file):

  ```yaml
  ---
  site:
  - title: A few words
    date: '2026-11-15'            # day the results came in
    time: '14:30'                 # optional; needed only when the record has no scored games
    tasks: [T-48]
    topic: controls               # a key of TOPICS (the category)
    short: The result in one line.
    question: The question in one line?
    cols: [pool2, cpu9, {vs: Frozen T4HumP1, models: [T4HumP1], seeds: 1000}]
    variants:
    - what: What was tried (one setting, its seeds in one row)
      models: [T48As1_c04, T48As2_c04]
    # optional: assessment (only rows scored with ASSESSMENT=<id>), graphs [{text, href}],
    # facts {head, rows} or facts_file {path, table}, watch [models], no_game reason, rescore: true
    verdict: What the scores say, in two or three sentences.
    decision: What the user decided (or what is pending).
  ---
  ```
- **A standard entry.** The row shows date and time, task, category, title, `short`, a strip of the first
  column's scores, and the watch buttons. Opened: question, verdict, decision, graph links; one bar plot per score
  column (bar = the variant's runs pooled, marks = single runs, dashed line = 50%); the `facts` table; watch
  buttons per variant.
- **Keep `verdict` short**: two or three sentences, 450 characters at most (the build stops on a longer one). The
  numbers are in the plot; the verdict says what they mean. Detail belongs in the private plan body.
- Every entry needs `topic` and `short`; the build stops otherwise.
- Score with `ASSESSMENT=<plan file name without .md> python sim/eval_vs_bot.py ...` when a record should count
  only its own rows (for example a re-score with new seeds).
- **Every finished task that trains, scores or measures something writes its record header.** The build stops
  when a score log holds a task number no record covers, or an end-of-run model no record lists.
- Every variant needs a game page, except in a record with `rescore: true` or a `no_game` reason.
- Publishing is one command in the main repo: `bash tools/publish.sh` (copies new WSL score rows back, builds,
  runs the safety check `tools/site_check.py`, commits and pushes this repo). `PUBLISH_DRY=1` stops before the
  commit. Dolphin game logs are copied into `logs/` by hand first.
- Public page: summaries and numbers only, never raw notes, local paths, replay player names or connect codes.

## Before a push

- `python build.py` runs without errors (it checks the names and the bar).
- New pages hold no local paths, replay player names or connect codes, and no simulator code or data:
  `tools/site_check.py` in the main repo checks every changed file (`--all`: every file) and `tools/publish.sh`
  runs it before each push.
- Look at one page of each tab, plus a scenario page and a game report, at phone and desktop width.
