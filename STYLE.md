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
- The roadmap, the game report template and the scenario template (main repo) carry their own copy of these
  tokens and fonts in their `<style>`: change them there too when `theme.py` changes.

## Layout

- Phone first: everything works at 360 px wide, 16 px side margins, no sideways scrolling of the page (wide tables
  scroll inside their own box).
- One column, 1180 px at most (`main`); running text is held to about 70 characters a line.

## Catalog tables (`theme.CATALOG`, `theme.CATALOG_JS`)

The experiments and models pages are the same kind of table:

- One row per thing, the result readable without opening it. Tap a row to open its detail under it; tap again to
  close. Tap a column heading to sort (the arrow shows the column and direction).
- **Fixed column widths.** The table uses `table-layout:fixed` and every column but the main one gets its width
  from a `<col>` element, so opening a row never resizes the columns (the user's report, 2026-11-16). A new
  column needs its `<col>`.
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
- `rankings.py` and `catalog.py` are libraries (score loaders, `BOARDS`, `CATALOG`, scenario scores); they build
  no page.
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
    # facts {head, rows} or facts_file {path, table}, watch [models], no_game reason, rescore: true,
    # writeup: <file in notes/experiments/public/> (the long form, see "Write-ups")
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

## Write-ups *(build)*

The long form of an experiment, in the order of a paper (the user, 2026-11-16: "more experiments written out in
more of an academic style ... each experiment would have its own dedicated page"; and: "it needs to be 100%
accurate"). The experiments table stays the short form; an opened row links its write-up under "Full write-up"
(a dashed "Not written yet" when there is none).

- **Where.** One Markdown file per record in the main repo, `notes/experiments/public/<name>.md`, named by the
  record's `writeup: <name>.md`. `writeups.py` builds `experiments/<name>.html` from it. Only this file and the
  record header are public; the plan body stays private. The record stays the source of title, date, variants,
  columns, verdict and decision.
- **The process for a new experiment** (the user, 2026-11-16: "Is there a simplified process to do this whenever
  we make a new experiment?"). After the record header is written and the scores are in the logs:
  1. `python new_writeup.py <plan file> <record number> <name> --script research/<x>/batch.sh [--script ...]`
     (in this repo). It writes the draft: the sections, the directives this record can fill, the `sources` list,
     and one setup row per training setting with its source and quote already found (from the batch script where
     the script passes the flag, from the trainer's default at the same commit otherwise).
  2. Add `writeup: <name>.md` to the record. Replace every `DRAFT` in the draft (the build refuses the word):
     word the values from their quotes, delete rows that do not apply (smoke and trial lines), copy the
     expectation from the plan word for word, write the question, the scoring paragraph, Discussion and
     Limitations.
  3. `python build.py`, print the page as text, check every sentence against its tables, then publish as usual.
  An experiment with no training script (a measurement, a tool) starts from the same command without `--script`
  and gets its setup rows by hand, each with `source` and `quote`.
- **Nothing is typed from memory.** The build stops on:
  - a setup row without `source: path@commit` and `quote:` (the text in that file, at that commit, the value was
    read from), or whose quote is not in the file. A value that can only be checked on the machine uses
    `checked: how and when` instead;
  - an expectation quote that is not word for word in the record's plan file;
  - a `sources` file that is not in git at its commit;
  - a score typed in prose (`41%`, `12 of 50`, `+332 Elo`) or a typed table. Scores come from directives.
- **Before writing, check every sentence against the generated tables** (print the built page as text). A claim
  the tables do not show is cut or goes under Limitations as "not tested".
- **Analysis output is cited from a frozen copy.** A table or curve from an analysis file (an Elo fit) is read
  from a dated copy of that file (`logs/t43/fit_long_batch_2026-11-15.md`), so a later re-fit cannot change a
  published page. The copy must be the output the record's numbers came from.
- A control that the record does not list is added to the record as a variant, not described in prose only.
- Template (sections in this order; block directives stand on a line of their own):

  ```markdown
  ---
  expectation:
    written: '2026-11-15'
    quotes: ['Text copied word for word from the plan, written before the runs.']
  setup:
  - {name: Training seeds, value: 21 and 22, source: research/t10_size/batch.sh@75e4ccf, quote: 'train T10W128s$i 2$i &'}
  - {name: Machine, value: '...', checked: 'processor name and nvidia-smi read on 16 Nov 2026'}
  sources:
  - {what: Training, file: research/t10_size/batch.sh, commit: 75e4ccf}
  ---
  ## Abstract
  {{abstract}}
  ## Question and hypothesis
  The question in two or three sentences; then {{expectation}} and what its terms mean.
  ## Setup
  {{setup}}
  {{runs}}
  How the models were scored (which runs, which opponents); the game counts are in the tables.
  ## Results
  {{scores}}
  {{plots}}
  {{training entropy | Caption.}}
  {{games}}
  ## Discussion
  One bold claim per paragraph; numbers only as {{win C V}}, {{won C V}}, {{fact R C}}, {{cell path n R C}}.
  ## Limitations
  ## Decision
  {{decision}}
  ## Reproduction
  {{sources}}
  ```
- Directives (the full list is the docstring of `writeups.py`): `{{abstract}}`, `{{expectation}}`, `{{setup}}`,
  `{{runs}}` (per run from `logs/<run>_train.csv` and `models/<model>/controls.json`), `{{scores}}` (games, games
  won, share with its Wilson 95% interval, each run, stocks), `{{plots}}`, `{{training <column> | caption}}`
  (entropy, approx_kl, reward_per_min, explained_var, lr), `{{curve <csv> <column> | caption}}`,
  `{{table <path> <n> | caption}}`, `{{line <path> | start of the line}}`, `{{facts}}`, `{{games}}`,
  `{{decision}}`, `{{sources}}`. Tables and figures are numbered in page order; check typed "Table 3" references
  after a build.
- Plots are inline SVG drawn at build time (chart colours `--s1` to `--s8` as on the curves page; one colour per
  variant). A picture that cannot be generated is a file in this repo's `experiments/` folder, placed with
  `![caption](file.png)`.
- Since 2026-11-16 `sim/ppo_run.py` saves `run.json` beside each model (every argument after defaults, the
  controls, the git blob id of each learner file). Models trained before that have no such file: their settings
  are setup rows with a source and quote. Reading `run.json` into `{{setup}}` is not built yet.
- The page is static: nothing on it responds to a click except links and a table's own sideways scroll.

## Before a push

- `python build.py` runs without errors (it checks the names and the bar).
- New pages hold no local paths, replay player names or connect codes, and no simulator code or data:
  `tools/site_check.py` in the main repo checks every changed file (`--all`: every file) and `tools/publish.sh`
  runs it before each push.
- Look at one page of each tab, plus a scenario page and a game report, at phone and desktop width.
