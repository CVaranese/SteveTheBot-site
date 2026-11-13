"""experiments.html: every experiment, newest first, with its question, variants, scores, verdict and the decision it
fed.

The text of each entry (question, variants and their models, verdict, decision) is kept by hand in EXPERIMENTS
below. The score tables are filled from the score logs at build time (logs/yardstick.csv from sim/eval_vs_bot.py;
logs/**/*_cpu9_games.csv from run.py --games-log), so new scores of a listed model show up on the next build.

The build stops when a score log holds a model no entry lists (every end-of-run model, by its shown name), or a
task number no entry covers. So every finished task adds its entry here (rule in STYLE.md, "Experiments").

Entry fields:
  topic     what was being tested: a key of TOPICS (the page groups entries by it)
  short     the result in one line, shown while the entry is folded and in "Recent experiments"
  tasks     task ids the entry covers, e.g. ['T-37']; the first is shown
  date      day the results came in (YYYY-MM-DD); entries are listed newest first
  title     a few words
  question  the question in one line
  cols      score columns: keys of OPP, or (header, [opponent model names]) for head-to-head scores
  variants  [(what was tried, [model names as in the score logs])]; seeds of one setting go in one row
  facts     optional hand-kept table for results that are not in the score logs: (header row, [rows])
  verdict   what the scores say
  decision  what the user decided from it (or what is pending)
"""
import html
import re
import time

from names import end_of_run, show
from rankings import _dolphin_scores, _links, _sim_scores

T4V2 = ['model_T4V2s%d_c04_seeds1000' % s for s in (3, 4, 5, 6)]

# column key -> (header, what it is, score source: 'dolphin' or [yardsticks in logs/yardstick.csv])
OPP = {
    'cpu9': ('CPU 9, Dolphin', 'Melee\'s own level 9 computer player in Slippi Dolphin (the real game)', 'dolphin'),
    't4v2': ('Frozen T4V2 (4 seeds)', 'The four T4V2 runs, frozen; 100 games against each, pooled. The yardstick for '
             'models with the current controls (every frame, 11-frame reaction delay)', T4V2),
    't21': ('Frozen T21L6Cs4', 'T21L6Cs4 frozen: the strongest model without reaction delay',
            ['model_T21L6Cs4_c04_seeds1000']),
    'ppo8': ('Frozen PPO8Self', 'PPO8Self frozen: the yardstick of the early PPO models',
             ['model_PPO8Self_c04_seeds1000']),
    'bot9': ('Scripted bot 9', 'The hand-written Falcon at level 9', ['scripted_bot_level9_seeds1000']),
    'bot3': ('Scripted bot 3', 'The hand-written Falcon at level 3', ['scripted_bot_level3_seeds1000']),
}

# what was being tested: (key, heading, what belongs here), in page order
TOPICS = [
    ('replays', 'Learning from human replays', 'Copying human Falcon games (imitation), then PPO from that start.'),
    ('method', 'Learning method and training settings', 'The learner itself: the 2017 baseline, PPO, learning rate, '
     'run length, edits to a trained network.'),
    ('inputs', 'What the network sees (inputs)', 'Changes to the numbers the network is given each frame.'),
    ('controls', 'Controller and timing', 'How often the bot acts, its reaction delay, and its buttons.'),
    ('yardsticks', 'Yardsticks and analysis tools', 'How the bot is measured: scenario tests and the game report.'),
    ('speed', 'Simulator, Dolphin and speed', 'Whether the simulator matches the real game, and how fast runs go.'),
    ('pplus', 'Project+', 'The target game: running it and playing it with a Melee model.'),
]
RECENT = 6                                            # entries in "Recent experiments"
EVAL_COLS = ['cpu9', 't4v2', 't21', 'ppo8', 'bot9']   # score columns of the evaluations table

EXPERIMENTS = [
    dict(tasks=['T-30'], date='2026-11-13', title='Scenarios for models with a reaction delay', topic='yardsticks',
         short='Now scored; recovery splits them (21% to 85%), shielding is impossible for them.',
         question='How do the models that decide every frame with a reaction delay do in the scenario positions?',
         cols=[], variants=[],
         facts=(['Model', 'Edgeguard', 'Recovery', 'Follow-up: one more hit', 'Whiff punish', 'First hit',
                 'Shield: not hit'], [
             ['T21L6Cs4 (no delay, for comparison)', '7%', '90%', '43%', '26%', '36%', '24%'],
             ['T4V2s3', '6%', '34%', '36%', '15%', '31%', '1%'],
             ['T4V2s5', '7%', '69%', '33%', '8%', '30%', '1%'],
             ['T37Plain8 (double length)', '9%', '65%', '38%', '13%', '29%', '1%'],
             ['T4ImFull (imitation only)', '9%', '24%', '23%', '8%', '19%', '0%'],
             ['T4HumP1', '6%', '44%', '41%', '19%', '31%', '1%'],
             ['T4HumP2', '7%', '54%', '41%', '14%', '32%', '1%'],
             ['T4HumKa1', '7%', '85%', '33%', '12%', '30%', '1%'],
             ['T4HumKa2', '8%', '85%', '32%', '12%', '28%', '0%'],
         ]),
         verdict='Every model now plays the positions with its own controls (scoring an old model again gave exactly '
                 'its earlier numbers). Against the frozen T21L6Cs4, which has no delay, the delayed models lose the '
                 'first hit about two times in three and rarely punish a whiff. Recovery splits them most and varies '
                 'between seeds (T4V2: 34% to 69%); the small pull back to the human policy (T4HumKa) recovers in '
                 '85% with both seeds. A delayed model starts each position with an empty delay queue and stands '
                 'still for 11 frames, so it is always hit at the shield positions; these numbers are not directly '
                 'comparable with models without a delay. 28 models scored; the full table is on the catalog for '
                 'the catalog models.',
         decision='Pending: none needed to use the scores.'),
    dict(tasks=['T-40'], date='2026-11-13', title='Matches per run', topic='speed',
         short='All three end level against frozen T4V2; per hour, 256 matches at once is behind.',
         question='Does playing more matches at once in one training run learn as well per game and per hour?',
         cols=['t4v2', ('vs plain 64 matches', ['T40M64s7_c08', 'T40M64s8_c08'])],
         variants=[
             ('64 matches at once (the usual)', ['T40M64s7_c08', 'T40M64s8_c08']),
             ('128 matches at once', ['T40M128s7_c08', 'T40M128s8_c08']),
             ('256 matches at once', ['T40M256s7_c08', 'T40M256s8_c08']),
         ],
         facts=(['Setting', 'Runs that fit in memory', 'Decisions per second, all runs', 'Hours to the usual length',
                 'Wins of 200, half way', 'Wins of 200, end'],
                [['64 matches', '8', '126,000', '0.85', '97.5', '96.5'],
                 ['128 matches', '6', '151,000', '0.53', '81', '107.5'],
                 ['256 matches', '4 (5 may fit)', '110,000', '0.49', '70.5', '94.5']]),
         verdict='All three end level against frozen T4V2 (50 games against each of the four; two seeds each, which '
                 'differ by up to 32 of 200). Per game played, 64 matches learns fastest in the middle of the run; '
                 'per hour of a full machine, 64 and 128 are level and 256 is behind. Memory, not the processor, '
                 'limits how many runs fit, and a run costs about 1.2 GB plus 6 MB per match, so 6 runs of 128 '
                 'matches play 13% to 20% more than 8 of 64 (two measurements). Speed-ups that keep the learning identical gave 9% for one run '
                 'alone.',
         decision='Pending: 128 matches as the screening setting (each batch about 0.6 h instead of 0.9) or keep 64.'),
    dict(tasks=['T-4'], date='2026-11-13', title='PPO from imitation (the human line)', topic='replays',
         short='Yes, likely: 62 wins of 100 against 48 from scratch. Pulling back to the human policy hurt.',
         question='Does starting PPO from a network that copied human Falcon replays beat starting from scratch?',
         cols=['t4v2', 'bot9', ('vs plain start', ['T4HumP1_c04', 'T4HumP2_c04'])],
         variants=[
             ('From scratch (reference, T-37 plain runs)', ['T37Plain7_c04', 'T37Plain8_c04']),
             ('The imitation network alone, no PPO (reference)', ['T4ImFull_c04']),
             ('The imitation network with frame history alone, no PPO (reference)', ['T4ImFullH4_c04']),
             ('From the imitation network', ['T4HumP1_c04', 'T4HumP2_c04']),
             ('From the imitation network with frame history', ['T4HumH1_c04', 'T4HumH2_c04']),
             ('From imitation, small pull back to the human policy (KL 0.1)', ['T4HumKa1_c04', 'T4HumKa2_c04']),
             ('From imitation, strong pull back to the human policy (KL 1.0)', ['T4HumKb1_c04', 'T4HumKb2_c04']),
         ],
         verdict='Starting from imitation helps: mean 62 wins of 100 against frozen T4V2, against 48 from scratch at '
                 'the same 2,940 updates, though the two seeds differ by 20 (72 and 52), so the gain is likely, not '
                 'firm. The imitation network alone wins almost nothing (1 of 100), so the gain comes only after PPO '
                 'moves away from it. The history start scores 47 and loses head to head to the plain start (34 of '
                 '100). Pulling the policy back toward the imitation network made it weaker: mean 38 with a small '
                 'pull, as weak as imitation alone with a strong one. Against the level 9 in-game CPU in Dolphin (50 '
                 'games): T4HumP1 won 21, the small-pull T4HumKa1 12, imitation alone 0; delayed models from scratch '
                 'won 1 to 3.',
         decision='PPO from imitation without a pull back is the best start found. Whether the imitation-based '
                  'models look more human is for the user to watch.'),
    dict(tasks=['T-37'], date='2026-11-13', title='Memory of past frames', topic='inputs',
         short='No: both history inputs score below plain inputs at the usual length.',
         question='Does adding the last few game states to the input (frame history) make a stronger bot?',
         cols=['t4v2', 'bot9', ('vs plain, double length', ['T37Plain7_c08', 'T37Plain8_c08'])],
         variants=[
             ('Plain inputs (no history)', ['T37Plain7_c04', 'T37Plain8_c04']),
             ('4 past states, 8 frames apart', ['T37H4s8_7_c04', 'T37H4s8_8_c04']),
             ('8 past states, 4 frames apart', ['T37H8s4_7_c04', 'T37H8s4_8_c04']),
             ('Plain inputs, double length', ['T37Plain7_c08', 'T37Plain8_c08']),
             ('4 past states, 8 apart, double length', ['T37H4s8_7_c08', 'T37H4s8_8_c08']),
             ('8 past states, 4 apart, double length', ['T37H8s4_7_c08', 'T37H8s4_8_c08']),
         ],
         verdict='No. At 2,940 updates both history inputs score below plain (36 and 41 against 48). At double '
                 'length (5,880 updates) 4 states 8 apart catches up (58 against 62, even head to head) and 8 states '
                 '4 apart stays behind (45; 36 head to head).',
         decision='No recurrent or transformer core is built for now; the imitation work (T-4) uses the plain '
                  'network, with a history twin for comparison.'),
    dict(tasks=['T-4'], date='2026-11-13', title='Imitation with frame history', topic='replays',
         short='Barely: prediction error 0.612 against 0.620.',
         question='Does frame history help a network predict what a human presses next?',
         cols=[], variants=[],
         facts=(['Held-out replays', 'Plain (T4ImFull)', '4 states, 8 apart (T4ImFullH4)'], [
             ['Cross-entropy (lower is better)', '0.620', '0.612'],
             ['Accuracy', '0.840', '0.841'],
             ['Accuracy of "repeat the last input"', '0.835', '0.836'],
             ['Accuracy when the human changes input', '0.083', '0.087'],
         ]),
         verdict='Barely: 0.008 lower cross-entropy, steady across checkpoints but well under the 0.02 to 0.10 '
                 'expected. Both networks mostly learn to repeat the last input; changes of input are the hard part '
                 '(right about 1 time in 12). 1,236 Falcon ditto games on Final Destination, 20.6 million frames.',
         decision='Both networks were trained on with PPO (the human line, above) to compare in play.'),
    dict(tasks=['T-4'], date='2026-11-12', title='Input version 2 (the zero line)', topic='inputs',
         short='No cost: input 2 wins 54 to 69 of 100 against input 1 runs.',
         question='Do inputs built only from what both the simulator and human replays record cost PPO anything?',
         cols=['bot9', ('vs input 1 runs', ['T4V1s5_c04', 'T4V1s6_c04', 'T17F54s3_c04', 'T17F54s4_c04'])],
         variants=[
             ('Input version 2', ['T4V2s3_c04', 'T4V2s4_c04', 'T4V2s5_c04', 'T4V2s6_c04']),
             ('Input version 1 (the usual inputs)', ['T4V1s5_c04', 'T4V1s6_c04']),
         ],
         verdict='No cost: input 2 runs as fast and wins 54 to 69 of 100 against input 1 runs (part of the '
                 'same-batch margin is seed luck).',
         decision='Input 2 is used for both lines: PPO from scratch and PPO from imitation. The four T4V2 runs '
                  'became the frozen yardstick for models with the current controls.'),
    dict(tasks=['T-4'], date='2026-11-12', title='First imitation runs', topic='replays',
         short='No: it repeats its last input and loses every game.',
         question='Can a network that copies human replays play on its own?',
         cols=['bot9'],
         variants=[
             ('Copy the replays', ['T4Im300_c02']),
             ('Copy the replays, input changes weighted 5 times', ['T4Im300W5_c01']),
         ],
         verdict='Not on its own. It learns to repeat its last input (84% accuracy, the same as "repeat the last '
                 'input") and loses every game, mostly by falling off the stage without using up-B. Weighting input '
                 'changes makes it predict them (24%) but does not fix recovery: the network reaches positions '
                 'humans rarely show. Trained on 254 games.',
         decision='The user chose the next step: imitation on all games, then PPO from that start (above).'),
    dict(tasks=['T-31'], date='2026-11-12', title='Scenario yardstick, version 2', topic='yardsticks',
         short='Recovery is solved (83% to 92%); edgeguarding is absent (5% to 11%).',
         question='Can saved positions test single skills (edgeguard, recovery, punishes) fairly?',
         cols=[], variants=[],
         facts=(['Scenario (vs frozen T21L6Cs4)', 'PPO models', 'Random'], [
             ['Edgeguard: takes the stock', '5% to 11%', '6%'],
             ['Recovery: back on stage', '83% to 92%', '7%'],
             ['Whiff punish', '21% to 29%', '16%'],
             ['First hit from neutral', '35% to 58%', '23%'],
             ['Shielding: not hit', '15% to 24%', '35%'],
         ]),
         verdict='Recovery is solved and edgeguarding is absent: the bots barely go after an opponent offstage. Starts '
                 'already lost or already safe are filtered out by playing them on first (170 of 380 kept). The '
                 'shielding test favours random play because the starts are moments these models were hit.',
         decision='The user watched samples and accepted them ("they\'re just cut a little too long"); the scenario '
                  'pages on this site play them.'),
    dict(tasks=['T-28'], date='2026-11-12', title='Scenario yardstick, version 1', topic='yardsticks',
         short='Too loose: many starts were already decided. Replaced by version 2.',
         question='First try at scoring edgeguard, follow-up and recovery from saved positions.',
         cols=[], variants=[],
         facts=(['Scenario (vs frozen T21L6Cs4)', 'PPO models', 'Random'], [
             ['Recovery', '81% to 86%', '19%'],
             ['Edgeguard', '21% to 28%', '14%'],
             ['Follow-up: extra damage', '8 to 12', '3.6'],
         ]),
         verdict='Recovery saturated; the edgeguard and follow-up tests were too loose (many starts already decided).',
         decision='The user found the scenarios "pretty poor" after watching them and asked for version 2 (above).'),
    dict(tasks=['T-17'], date='2026-11-12', title='Two-head controller', topic='controls',
         short='No: the 54 actions beat both 102-action versions about 3 games in 4.',
         question='Does choosing a button, then a stick position (102 combinations) beat the 54 fixed actions?',
         cols=['cpu9', 'bot9', ('vs 102 in one list', ['T17F102s3_c04', 'T17F102s4_c04']),
               ('vs two heads', ['T17H102s3_c04', 'T17H102s4_c04'])],
         variants=[
             ('54 actions (as before)', ['T17F54s3_c04', 'T17F54s4_c04']),
             ('102 actions in one list', ['T17F102s3_c04', 'T17F102s4_c04']),
             ('102 actions, two heads (button, then stick)', ['T17H102s3_c04', 'T17H102s4_c04']),
         ],
         verdict='The 54 actions win: they beat both 102-action versions about 3 games in 4; two heads and one list '
                 'are about even (48 of 100). All act every frame with an 11-frame delay and lose to the undelayed yardsticks.',
         decision='The 54 actions stay the default; two heads is an option.'),
    dict(tasks=['T-16'], date='2026-11-12', title='Every frame, with reaction delay', topic='controls',
         short='Every frame costs nothing; a 15-frame delay costs a lot (10 of 50 against the level 9 CPU, the '
               'others 42 to 46).',
         question='Does a decision every frame, and a human-like reaction delay, change how well the bot learns?',
         cols=['cpu9', 't21', 'bot9'],
         variants=[
             ('Every 2 frames, no delay (as before)', ['T16Base3_c04', 'T16Base4_c04']),
             ('Every frame, no delay', ['T16F1s3_c04', 'T16F1s4_c04']),
             ('Every frame, 15-frame delay', ['T16F1D15s3_c04', 'T16F1D15s4_c04']),
         ],
         verdict='Every frame without delay plays about as well as every 2 frames. A 15-frame delay costs a lot at '
                 'this training length: it wins 10 of 50 against the level 9 CPU, the others 42 to 46.',
         decision='The user made every frame with an 11-frame delay (0.19 s) the default after watching: the bot '
                  'should play with human reactions, even if scores drop.'),
    dict(tasks=['T-15'], date='2026-11-12', title='Does a held button stay held?', topic='controls',
         short='Yes, one long press: the bot cannot press a button twice in a row.',
         question='When the bot picks the same button twice in a row, is it one long press or two?',
         cols=[], variants=[],
         verdict='One continuous hold, in Dolphin and the simulator alike (identical traces): the bot cannot press a '
                 'button twice without another action between.',
         decision='Kept in mind for the controller work; no change made.'),
    dict(tasks=['T-22'], date='2026-11-12', title='Twice as long', topic='method',
         short='Yes: each long run beats its own half-way copy 93 to 100 times in 100.',
         question='Does training for 5,880 updates instead of 2,940 pay, and does it change which inputs win?',
         cols=['cpu9', 't21'],
         variants=[
             ('Plain inputs, 5,880 updates', ['T22LongBase7_c08', 'T22LongBase8_c08']),
             ('Animation embedding, 5,880 updates', ['T22LongEmb5_c08', 'T22LongEmb6_c08', 'T22LongEmb7_c08',
                                                     'T22LongEmb8_c08', 'T22LongEmb9_c08', 'T22LongEmb10_c08']),
             ('Plain inputs, 2,940 updates (reference)', ['T21L6Cs4_c04']),
             ('Animation embedding, 2,940 updates', ['T22EmbSmall3_c04']),
         ],
         verdict='Twice as long pays strongly: each long run beats its own half-way copy 93 to 100 times in 100. The '
                 'embedding falls behind plain inputs at both lengths (84 against 98 at double length).',
         decision='Screening stays at 2,940 updates; double length is for a model to present. The embedding was '
                  'dropped as default.'),
    dict(tasks=['T-5', 'T-23'], date='2026-11-12', title='Project+ in Dolphin', topic='pplus',
         short='About 620 to 750 frames a second per copy; a Melee model plays whole P+ games.',
         question='How fast does P+ run in a scriptable Dolphin, and can a Melee model play it?',
         cols=[], variants=[],
         facts=(['Measure', 'Result'], [
             ['Game speed, one copy', 'about 620 to 750 frames a second (10 to 12 times real time)'],
             ['Four copies at once', 'about 620 frames a second each'],
             ['Scripted inputs (after our fix)', 'every input lands, 1 to 2 frames late'],
             ['Game states that map to Melee exactly', '91%'],
         ]),
         verdict='A Melee-trained model plays whole P+ games through a translator. A savestate bug in the scripting '
                 'Dolphin ran P+ at double speed and dropped every second input; our fork fixes it.',
         decision='Falcon against Falcon on Battlefield or Final Destination; no Melee level is required first.'),
    dict(tasks=['T-12', 'T-22'], date='2026-11-11', title='Re-screen at the new learning rate', topic='inputs',
         short='Only the embedding beat plain inputs in this batch; it lost again at double length.',
         question='At the larger learning rate, which input variants still beat plain inputs?',
         cols=['t21', 'cpu9'],
         variants=[
             ('Plain inputs', ['T22Base5_c04', 'T22Base6_c04']),
             ('Animation embedding, small start', ['T22EmbSmall3_c04', 'T22EmbSmall4_c04']),
             ('Inputs rescaled', ['T22Scale3_c04', 'T22Scale4_c04']),
             ('Learning rate 0.0012', ['T22L12Cs3_c04', 'T22L12Cs4_c04']),
         ],
         verdict='The embedding beats plain inputs in this batch (50 against 12 of 100); rescaling does not help; '
                 'doubling the rate again is not better. T21L6Cs4 itself turned out to be an unusually strong seed.',
         decision='The user set the rule (a variant becomes default if it beats plain runs from the same batch by 10 '
                  'or more, with no run below the lowest plain run) and made the embedding default, then dropped it '
                  'after the double-length runs (above).'),
    dict(tasks=['T-21'], date='2026-11-11', title='Larger learning rate', topic='method',
         short='Yes: from about 54 to about 92 wins of 100 against frozen PPO8Self.',
         question='Does a larger learning rate (step size) make PPO learn faster at the same length?',
         cols=['ppo8', ('vs frozen T21L6s3', ['T21L6s3_c04']), 't21'],
         variants=[
             ('0.0006, lowered to zero', ['T21L6s3_c04', 'T21L6s4_c04', 'T21L6s5_c04', 'T21L6s6_c04']),
             ('0.0006, held constant', ['T21L6Cs3_c04', 'T21L6Cs4_c04']),
             ('0.0003, held constant', ['T21L3Cs3_c04', 'T21L3Cs4_c04']),
         ],
         verdict='Much better: from about 54 to about 92 of 100 against frozen PPO8Self. 0.0006 held constant is '
                 'strongest and was still improving at the end.',
         decision='0.0006 held constant became the default ("We can make these the defaults").'),
    dict(tasks=['T-19'], date='2026-11-11', title='Faster experiments', topic='speed',
         short='8 runs share the GPU; half-length runs cannot rank variants.',
         question='Can runs be shorter, and run many at once on the GPU, and still rank variants right?',
         cols=['ppo8', 'bot9'],
         variants=[
             ('Plain inputs, 2,940 updates', ['T19Base3_c04', 'T19Base4_c04']),
             ('Embedding, small start', ['T19EmbSmall2_c04', 'T19EmbSmall3_c04']),
             ('Embedding, large start', ['T19Emb2_c04']),
             ('Previous action as input', ['T19Prev3_c04']),
             ('Half length (1,470 updates)', ['T19hBase3_c01', 'T19hBase4_c01', 'T19hEmb2_c01', 'T19hEmbSmall2_c01',
                                              'T19hEmbSmall3_c01', 'T19hPrev3_c01']),
             ('Half length, learning rate 0.0006', ['T19L6Base3_c01', 'T19L6Base4_c01', 'T19L6Emb2_c01',
                                                    'T19L6EmbSmall2_c01', 'T19L6EmbSmall3_c01', 'T19L6Prev3_c01']),
             ('Half length, learning rate 0.0012', ['T19L12Base3_c01', 'T19L12Prev3_c01']),
         ],
         verdict='Up to 8 runs share the GPU (71,000 decisions a second in all). Half-length runs are far weaker and '
                 'rank variants differently, so they cannot screen. Doubling the learning rate at half length '
                 'raised wins from about 4 to 31: the step size was holding learning back.',
         decision='Screening stays at full length with two seeds per variant, 8 runs at once; the step-size result '
                  'led to T-21.'),
    dict(tasks=['T-18'], date='2026-11-11', title='Game report', topic='yardsticks',
         short='85% of moves hit nothing; in 57% to 70% of decisions no input could matter.',
         question='What does one game look like decision by decision, and which inputs could have mattered?',
         cols=[], variants=[],
         facts=(['Measure (one game per model)', 'Result'], [
             ['Decisions where no input could change the next half second', '57% to 70%'],
             ['Inputs that change what the character does', 'about 11%'],
             ['Moves started per minute', 'about 55'],
             ['Moves that hit nothing', '85%, most from more than 40 units away'],
         ]),
         verdict='The bot throws moves at nothing and rarely follows up; when it is free to act, it chooses between '
                 'about 3 options. The critic tracks the next few seconds, not the stock lead.',
         decision='The game report pages on this site come from this; the same report is meant for the user\'s own '
                  'games later.'),
    dict(tasks=['T-12'], date='2026-11-11', title='Second seed for the input variants', topic='inputs',
         short='The previous-action gain did not repeat; one run per variant cannot rank close variants.',
         question='Do the T-9 input gains hold with a second random seed?',
         cols=['ppo8', 'bot9'],
         variants=[
             ('Plain inputs', ['T12Base_c01']),
             ('Previous action as input', ['T12Prev_c01']),
             ('Embedding, small start', ['T12EmbSmall_c01']),
             ('Embedding, small start, previous action', ['T12EmbSmallPrev_c01']),
         ],
         verdict='The previous-action gain did not repeat (54 against 47); the small-start embedding looked best. '
                 'Same-setting runs differ by 12 to 13 wins, so one run per variant cannot rank close variants.',
         decision='Two seeds per variant from here on; the previous action stays optional (the user: it does not say '
                  'whether the press took effect).'),
    dict(tasks=['T-9'], date='2026-11-11', title='Input variants', topic='inputs',
         short='Previous action 72 against plain 54 of 100, one seed each (not confirmed by the second seed).',
         question='Do a learned animation embedding, or the bot\'s own previous action, make better inputs?',
         cols=['ppo8', 'bot9'],
         variants=[
             ('Plain inputs', ['T9Base_c01']),
             ('Previous action as input', ['T9Prev_c01']),
             ('Embedding', ['T9Emb_c01']),
             ('Embedding and previous action', ['T9EmbPrev_c01']),
         ],
         verdict='Previous action 72 and embedding with previous action 69, against 54 for plain inputs; the '
                 'embedding alone 32. One seed each.',
         decision='Checked with a second seed (T-12, above).'),
    dict(tasks=['weights'], date='2026-11-11', title='Hand-edited weights', topic='method',
         short='Yes: sharper choices and a wired-in recovery lose fewer stocks to the level 9 CPU.',
         question='Can editing a trained network by hand (sharper choices, a wired-in recovery) make it play better?',
         cols=['cpu9', 'ppo8'],
         variants=[
             ('Unchanged (PPO8Bot)', ['PPO8Bot_c04']),
             ('Choices sharpened (output times 2.5)', ['PPO8Bot_c04_edit']),
             ('Sharpened plus a hand-wired recovery', ['PPO8Bot_c04_edit_rec']),
         ],
         verdict='Both edits lose fewer stocks to the level 9 CPU (2.05 to 1.62 and 1.34) and win more against '
                 'frozen PPO8Self. Fully greedy play is worse: some randomness is needed, since the network cannot '
                 'see its own last press.',
         decision='The user watched it: it "definitely flails less". Hand edits stay a one-off; temperature '
                  'tuning before scoring is queued.'),
    dict(tasks=['T-11'], date='2026-11-11', title='PPO against the in-game CPU', topic='method',
         short='PPO wins 25 to 48 of 50 at level 9; the 2017 learner none.',
         question='How do the first PPO models do against Melee\'s own computer player?',
         cols=['cpu9', 'ppo8'],
         variants=[
             ('2017 learner (reference)', ['SimBase_c08']),
             ('PPO, self-play', ['PPOSelf_c04']),
             ('PPO, vs scripted bot', ['PPOBot_c04']),
             ('PPO with network fixes, self-play', ['PPO8Self_c04']),
             ('PPO with network fixes, vs scripted bot', ['PPO8Bot_c04']),
         ],
         verdict='Every PPO model wins all 50 games at level 3 and 25 to 48 of 50 at level 9; the 2017 learner wins '
                 'none. The scripted bot is saturated, so a frozen model (PPO8Self) became the harder yardstick. The '
                 'two kinds of opponent rank bot-trained and self-play models in opposite orders.',
         decision='The frozen-model yardstick became the routine score.'),
    dict(tasks=['T-3', 'T-8'], date='2026-11-11', title='PPO with GAE', topic='method',
         short='Yes: PPO wins 87 to 100 of 100 against the level 3 scripted bot after 20 minutes.',
         question='Does replacing the 2017 actor-critic with PPO and GAE (and fixing the network) make a bot that '
                  'wins?',
         cols=['bot3', 'bot9'],
         variants=[
             ('2017 learner, self-play (reference)', ['SimBase_c08']),
             ('2017 learner, vs scripted bot', ['SimBaseBot_c08']),
             ('PPO, self-play', ['PPOSelf_c04']),
             ('PPO, vs scripted bot', ['PPOBot_c04']),
             ('PPO with network fixes, self-play', ['PPO8Self_c04']),
             ('PPO with network fixes, vs scripted bot', ['PPO8Bot_c04']),
         ],
         verdict='Yes: in 20 minutes PPO wins 87 to 100 of 100 against the level 3 scripted bot, which the 2017 '
                 'learner never beat in 48,000 updates. PPO runs 15,400 decisions a second (the old learner 5,600).',
         decision='PPO with the network fixes became the learner.'),
    dict(tasks=['T-2', 'T-7'], date='2026-11-11', title='Simulator against Dolphin', topic='speed',
         short='Yes: 29 of 30 input columns are equal on every frame of a whole game.',
         question='Does the simulator build the same inputs as the real game, frame for frame?',
         cols=[], variants=[],
         verdict='One whole two-controller game (4,907 frames) replays in the simulator to the end; after a hitstun '
                 'fix, 29 of 30 input columns are equal on every frame (the last differs in 27 idle frames). Games '
                 'against the in-game CPU cannot be replayed this way.',
         decision='Training moved to the simulator; the hitstun fix is in the inputs.'),
    dict(tasks=['T-1', 'baseline'], date='2026-11-11', title='The 2017 learner as a baseline', topic='method',
         short='Barely above random: it never wins a game.',
         question='How good is the original 2017 learner, in Dolphin and in the simulator?',
         cols=['bot3'],
         variants=[
             ('Random play', ['random']),
             ('Trained in Dolphin, 21,850 updates', ['Steve_2026-11-11_u21850']),
             ('Simulator, self-play, 48,000 updates', ['SimBase_c08']),
             ('Simulator, vs scripted bot, 48,000 updates', ['SimBaseBot_c08']),
         ],
         facts=(['Stocks taken per game from the level 3 scripted bot (100 games)', 'Stocks'], [
             ['Random play', '0.14'],
             ['Trained in Dolphin, 21,850 updates', '0.64'],
             ['Simulator, self-play, 48,000 updates', '0.43'],
             ['Simulator, vs scripted bot, 48,000 updates', '0.69'],
         ]),
         verdict='Barely above random: it never wins a game and its choices stay close to random. Models trained '
                 'only in the simulator play at least as well against the real CPU as the one trained in Dolphin.',
         decision='The baseline came first, on the user\'s instruction; PPO was the first change of method.'),
]

STYLE = """
main{max-width:1000px}
main>*,article{min-width:0;max-width:100%}
td.v{min-width:170px}
.toc{columns:2 280px;column-gap:24px;margin-top:8px;padding:10px 14px;background:var(--surface);
  border:1px solid var(--line);border-radius:6px;list-style:none}
.toc li{display:block;padding:3px 0;border:0;break-inside:avoid}
.toc span{color:var(--muted);font-size:.82rem;margin-right:6px;font-variant-numeric:tabular-nums}
article{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px;scroll-margin-top:60px}
article h2{font-size:1.15rem;margin:2px 0 6px}
article .meta{color:var(--muted);font-size:.85rem}
article .meta b{color:var(--accent);font-weight:700}
article .q{color:var(--ink);font-style:italic}
article dl{margin:12px 0 0;display:grid;grid-template-columns:max-content 1fr;gap:6px 14px;font-size:.93rem}
article dt{font-weight:600} article dd{margin:0;color:var(--muted)}
@media (max-width:560px){article dl{grid-template-columns:1fr} article dd{margin-bottom:6px}}
.tw{overflow-x:auto;margin-top:10px;border:1px solid var(--line);border-radius:6px}
table{border-collapse:collapse;width:100%;font-size:.88rem;font-variant-numeric:tabular-nums}
th,td{padding:6px 9px;text-align:left;border-top:1px solid var(--line);vertical-align:top}
thead th{border-top:0;color:var(--muted);font-weight:600;font-size:.8rem}
td.n,th.n{text-align:right;white-space:nowrap}
td.n small{display:block;color:var(--muted);font-size:.75rem;font-weight:400}
td.d{color:var(--muted)}
td.v b{display:block;font-weight:600}
td.v span{color:var(--muted);font-size:.8rem}
a.pg{display:inline-block;font-size:.75rem;padding:0 6px;margin:2px 2px 0 0;border:1px solid var(--line);
  border-radius:10px;text-decoration:none}
.small{font-size:.85rem;margin-top:6px}
.cols{font-size:.88rem}
.cols dt{font-weight:600}
.jump{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.jump a{padding:5px 12px;border:1px solid var(--line);border-radius:16px;background:var(--surface);
  text-decoration:none;font-size:.9rem;font-weight:600}
main>section{scroll-margin-top:60px}
.when{color:var(--muted);font-size:.8rem;font-variant-numeric:tabular-nums;white-space:nowrap}
.chip{display:inline-block;font-size:.72rem;padding:0 8px;border:1px solid var(--line);border-radius:10px;
  color:var(--muted);white-space:nowrap;text-decoration:none}
.recent{list-style:none;margin:8px 0 0;padding:0;background:var(--surface);border:1px solid var(--line);
  border-radius:8px}
.recent li{display:block;padding:10px 14px}
.recent li a.t{font-weight:600;text-decoration:none;margin:0 6px}
.recent li p{font-size:.9rem;margin-top:2px}
.topic{margin-top:18px;scroll-margin-top:60px}
.topic h3{font-size:1rem;margin:0}
.topic h3 span{color:var(--muted);font-weight:400;font-size:.85rem;margin-left:4px}
details.x{margin-top:8px;background:var(--surface);border:1px solid var(--line);border-radius:8px;
  scroll-margin-top:60px}
details.x>summary{padding:10px 14px;color:var(--ink);font-size:.95rem;cursor:pointer}
details.x>summary b{margin:0 6px}
details.x>summary .short{display:block;color:var(--muted);font-size:.88rem;margin:2px 0 0 1.1em}
details.x[open]>summary{border-bottom:1px solid var(--line)}
.xb{padding:12px 14px 14px}
.xb .q{color:var(--ink);font-style:italic}
.xb dl{margin:12px 0 0;display:grid;grid-template-columns:max-content 1fr;gap:6px 14px;font-size:.93rem}
.xb dt{font-weight:600} .xb dd{margin:0;color:var(--muted)}
@media (max-width:560px){.xb dl{grid-template-columns:1fr} .xb dd{margin-bottom:6px}}
.evbar{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin-top:10px;font-size:.9rem}
.evbar input[type=search],.evbar select{font:inherit;font-size:.9rem;padding:5px 9px;border:1px solid var(--line);
  border-radius:6px;background:var(--surface);color:var(--ink);max-width:100%}
.evbar label{color:var(--muted);white-space:nowrap}
#ev-n{color:var(--muted);font-size:.85rem}
#evals{background:var(--surface)}
#evals th[data-c]{cursor:pointer;text-decoration:underline dotted}
#evals th.on{color:var(--accent)}
#evals th.on::after{content:' \\25BE'}
#evals td.v{min-width:200px}
#evals td.v a.x{font-size:.8rem}
#evals td.w{min-width:120px}
"""


def _src_rows(col, sim, dol):
    """The score rows a column reads: {model: [games, won, taken, lost, day]} per source, as a list."""
    if isinstance(col, tuple):
        return [sim.get('model_%s_seeds1000' % m, {}) for m in col[1]], {m for m in col[1]}
    source = OPP[col][2]
    if source == 'dolphin':
        return [dol], set()
    return [sim.get(y, {}) for y in source], {y[len('model_'):-len('_seeds1000')] for y in source
                                             if y.startswith('model_')}


def _cell(models, col, sim, dol):
    srcs, opps = _src_rows(col, sim, dol)
    if all(m in opps for m in models):
        return '<td class="n d" title="These models are the opponent">ref.</td>'
    per = []
    for m in models:
        s = [0, 0, 0.0, 0.0]
        for i, rows in enumerate(srcs):
            r = rows.get(m)
            if r and r[0]:
                for k in range(4):
                    s[k] += r[k]
        per.append((m, s))
    played = [(m, s) for m, s in per if s[0]]
    if not played:
        return '<td class="n d">&ndash;</td>'
    g = sum(s[0] for _, s in played)
    won = sum(s[1] for _, s in played)
    lead = (sum(s[2] for _, s in played) - sum(s[3] for _, s in played)) / g
    tip = '; '.join('%s: %d%% of %d games' % (show(m), round(100.0 * s[1] / s[0]), s[0]) for m, s in played)
    if len(played) < len(models):
        tip += '; not scored: ' + ', '.join(show(m) for m, s in per if not s[0])
    runs = ' &middot; '.join('%d' % round(100.0 * s[1] / s[0]) for _, s in played) if len(played) > 1 else ''
    return '<td class="n" title="%s. Stock lead %+.2f a game.">%d%%%s</td>' % (
        html.escape(tip), lead, round(100.0 * won / g), '<small>%s</small>' % runs if runs else '')


def _head(col):
    if isinstance(col, tuple):
        return '<th class="n" title="Head to head: games won against %s">%s</th>' % (
            html.escape(', '.join(show(m) for m in col[1])), html.escape(col[0]))
    return '<th class="n" title="%s">%s</th>' % (html.escape(OPP[col][1]), html.escape(OPP[col][0]))


def _table(e, sim, dol, pages):
    if not e['variants'] or not e['cols']:
        return ''
    rows = []
    for what, models in e['variants']:
        names = []
        for m in models:
            n = show(m)
            if n not in names:
                names.append(n)
        links = ''.join(_links(pages.get(n, []), True) for n in names)
        rows.append('<tr><td class="v"><b>%s</b><span>%s</span>%s</td>%s</tr>' % (
            html.escape(what), html.escape(', '.join(names)), ('<div>%s</div>' % links) if links else '',
            ''.join(_cell(models, c, sim, dol) for c in e['cols'])))
    return ('<div class="tw"><table><thead><tr><th>Variant (models)</th>%s</tr></thead><tbody>%s</tbody></table>'
            '</div>' % (''.join(_head(c) for c in e['cols']), ''.join(rows)))


def _facts(e):
    if not e.get('facts'):
        return ''
    head, rows = e['facts']
    return ('<div class="tw"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>' % (
        ''.join('<th>%s</th>' % html.escape(h) for h in head),
        ''.join('<tr>%s</tr>' % ''.join('<td>%s</td>' % html.escape(c) for c in r) for r in rows)))


def _anchor(e):
    return 'x-%s-%s' % (e['date'], re.sub(r'[^a-z0-9]+', '-', e['title'].lower()).strip('-'))


def _day(d):
    return time.strftime('%d %b', time.strptime(d, '%Y-%m-%d'))


def _entry(e, sim, dol, pages):
    """One experiment, folded: date, title and the one-line result show; the rest opens."""
    tid = ', '.join(t for t in e['tasks'] if t.startswith('T-'))
    return ('<details class="x" id="%s"><summary><span class="when">%s</span><b>%s</b><span class="when">%s</span>'
            '<span class="short">%s</span></summary><div class="xb"><p class="q">%s</p>%s%s<dl><dt>Verdict</dt>'
            '<dd>%s</dd><dt>Decision</dt><dd>%s</dd></dl></div></details>' % (
                _anchor(e), _day(e['date']), html.escape(e['title']), html.escape(tid), html.escape(e['short']),
                html.escape(e['question']), _table(e, sim, dol, pages), _facts(e), html.escape(e['verdict']),
                html.escape(e['decision'])))


def _score(m, col, sim, dol):
    """One model against one column's opponent: 'ref' when it is the opponent, None when not scored, else
    [games, won, stocks taken, stocks lost]."""
    srcs, opps = _src_rows(col, sim, dol)
    if m in opps:
        return 'ref'
    s = [0, 0, 0.0, 0.0]
    for rows in srcs:
        r = rows.get(m)
        if r and r[0]:
            for k in range(4):
                s[k] += r[k]
    return s if s[0] else None


def _evals(entries, sim, dol, pages):
    """The evaluations table: every model of every experiment, one row each, newest experiment first. A model
    listed by several experiments (a reference) belongs to the oldest one."""
    home = {}
    for e in reversed(entries):
        for what, models in e['variants']:
            for m in models:
                home.setdefault(m, (e, what))
    rows = []
    for e in entries:
        for what, models in e['variants']:
            for m in models:
                if home.get(m, (None,))[0] is not e:
                    continue
                del home[m]                       # a model listed twice in one entry gets one row
                name = show(m)
                cells = []
                for c in EVAL_COLS:
                    s = _score(m, c, sim, dol)
                    if s == 'ref':
                        cells.append('<td class="n d" data-v="-1" title="This model is the opponent">ref.</td>')
                    elif s is None:
                        cells.append('<td class="n d" data-v="-1">&ndash;</td>')
                    else:
                        pct = 100.0 * s[1] / s[0]
                        cells.append('<td class="n" data-v="%.2f" title="%d games, stock lead %+.2f a game">%d%%'
                                     '</td>' % (pct, s[0], (s[2] - s[3]) / s[0], round(pct)))
                links = _links(pages.get(name, []), True)
                rows.append('<tr data-i="%d" data-topic="%s" data-watch="%d"><td class="v"><b>%s</b><span>%s</span>'
                            '<div><a class="x" href="#%s">%s</a></div></td>%s<td class="w">%s</td></tr>' % (
                                len(rows), e['topic'], 1 if links else 0, html.escape(name),
                                html.escape(re.sub(r' \(reference[^)]*\)', '', what)), _anchor(e),
                                html.escape(e['title']), ''.join(cells), links or '<span class="when">&ndash;</span>'))
    heads = ''.join('<th class="n" data-c="%d" title="%s. Tap to sort.">%s</th>' % (
        i + 1, html.escape(OPP[c][1]), html.escape(OPP[c][0])) for i, c in enumerate(EVAL_COLS))
    return ('<div class="tw"><table id="evals"><thead><tr><th>Model</th>%s<th>Watch</th></tr></thead><tbody>%s'
            '</tbody></table></div>' % (heads, ''.join(rows)))


SCRIPT = """<script>
(function () {
  var tb = document.querySelector('#evals tbody'), rows = [].slice.call(tb.rows),
      q = document.getElementById('ev-q'), tp = document.getElementById('ev-topic'),
      w = document.getElementById('ev-watch'), n = document.getElementById('ev-n');
  function filter() {
    var s = q.value.toLowerCase(), c = 0;
    rows.forEach(function (r) {
      var ok = (!s || r.textContent.toLowerCase().indexOf(s) >= 0) && (!tp.value || r.dataset.topic === tp.value) &&
               (!w.checked || r.dataset.watch === '1');
      r.hidden = !ok; if (ok) c++;
    });
    n.textContent = c + ' of ' + rows.length + ' models';
  }
  q.oninput = tp.onchange = w.onchange = filter; filter();
  [].forEach.call(document.querySelectorAll('#evals th[data-c]'), function (th) {
    th.onclick = function () {
      var c = +th.dataset.c, on = th.classList.contains('on');
      [].forEach.call(th.parentNode.children, function (x) { x.classList.remove('on'); });
      rows.sort(on ? function (a, b) { return a.dataset.i - b.dataset.i; }
                   : function (a, b) { return b.cells[c].dataset.v - a.cells[c].dataset.v || a.dataset.i - b.dataset.i; });
      if (!on) th.classList.add('on');
      rows.forEach(function (r) { tb.appendChild(r); });
    };
  });
  // a link to one experiment opens it
  function open() {
    var t = location.hash && document.getElementById(location.hash.slice(1));
    if (t && t.tagName === 'DETAILS') { t.open = true; t.scrollIntoView(); }
  }
  window.addEventListener('hashchange', open); open();
})();
</script>"""


def _check(sim, dol):
    """Every task number and every end-of-run model in the score logs must be in an entry."""
    listed = {show(m) for e in EXPERIMENTS for _w, ms in e['variants'] for m in ms}
    tasks = {t for e in EXPERIMENTS for t in e['tasks']}
    logged = set(dol) | {m for rows in sim.values() for m in rows}
    missing_tasks = sorted({'T-%s' % re.match(r'T(\d+)', m)[1] for m in logged if re.match(r'T\d+', m)} - tasks)
    missing = sorted({show(m) for m in logged if end_of_run(m) and 'Smoke' not in m} - listed)
    if missing_tasks or missing:
        raise SystemExit('experiments.py: the score logs hold %s with no entry. Add an entry to EXPERIMENTS (or the '
                         'models to an entry\'s variants).' % '; '.join(
                             x for x in ['tasks ' + ', '.join(missing_tasks) if missing_tasks else '',
                                         'models ' + ', '.join(missing) if missing else ''] if x))


def build(here, src, head, site_style, pages=None):
    """Write experiments.html; return the raw model names it shows (for the name check)."""
    pages = pages or {}
    sim, dol = _sim_scores(src), _dolphin_scores(src)
    _check(sim, dol)
    entries = sorted(EXPERIMENTS, key=lambda e: e['date'], reverse=True)   # stable: file order within a day
    shown = {m for e in entries for _w, ms in e['variants'] for m in ms}
    for e in entries:
        for c in e['cols']:
            if isinstance(c, tuple):
                shown.update(c[1])
    titles = {k: t for k, t, _a in TOPICS}
    bad = [e['title'] for e in entries if e.get('topic') not in titles or not e.get('short')]
    if bad:
        raise SystemExit('experiments.py: entries need a topic (a key of TOPICS) and a short result line: %s'
                         % '; '.join(bad))
    recent = ''.join('<li><span class="when">%s</span><a class="t" href="#%s">%s</a><a class="chip" href="#t-%s">%s'
                     '</a><p>%s</p></li>' % (_day(e['date']), _anchor(e), html.escape(e['title']), e['topic'],
                                             html.escape(titles[e['topic']]), html.escape(e['short']))
                     for e in entries[:RECENT])
    topics, opts = [], []
    for key, title, about in TOPICS:
        mine = [e for e in entries if e['topic'] == key]
        if not mine:
            continue
        opts.append('<option value="%s">%s</option>' % (key, html.escape(title)))
        topics.append('<div class="topic" id="t-%s"><h3>%s<span>%d</span></h3><p class="small">%s</p>%s</div>' % (
            key, html.escape(title), len(mine), html.escape(about),
            ''.join(_entry(e, sim, dol, pages) for e in mine)))
    cols = ''.join('<dt>%s</dt><dd>%s.</dd>' % (html.escape(h), html.escape(a)) for h, a, _s in OPP.values())
    page = head.replace('</head>', '<title>SteveTheBot experiments</title><style>%s%s</style></head>' % (
        site_style, STYLE)) + """<main>
<header><h1>Experiments</h1>
<p>What was tested and what came of it. Rebuilt %s from the score logs.</p>
<div class="jump"><a href="#recent">Recent</a><a href="#topics">By what was tested</a><a href="#evaluations">Model
evaluations</a></div></header>
<section id="recent"><h2>Recent experiments</h2>
<p>The %d newest, with the result in one line. Tap a title for the full entry.</p>
<ol class="recent">%s</ol></section>
<section id="topics"><h2>By what was tested</h2>
<p>All %d experiments, grouped by subject, newest first in each group. Tap one to open its question, scores, verdict
and the decision made from it. Score cells are games won of 100 against that opponent, pooled over the variant's
runs; the small numbers under a cell are the single runs (two runs of the same settings often differ by 10 to
20).</p>
%s</section>
<section id="evaluations"><h2>Model evaluations</h2>
<p>Every model of every experiment, one row each, newest experiment first. Numbers are the share of games won
against that opponent; tap a column heading to sort by it. "Watch" opens a game or the scenario samples of that
model. The <a href="rankings.html">rankings</a> order the models per opponent; the
<a href="catalog.html">catalog</a> shows one model per change.</p>
<div class="evbar"><input type="search" id="ev-q" placeholder="Find a model" aria-label="Find a model">
<select id="ev-topic" aria-label="Subject"><option value="">Every subject</option>%s</select>
<label><input type="checkbox" id="ev-watch"> only models with something to watch</label><span id="ev-n"></span></div>
%s</section>
<section class="cols"><h2>The opponents in the columns</h2><dl class="cols">%s<dt>vs ...</dt><dd>Head to head: games
won against the models named in the column header (hover it).</dd></dl></section>
</main>%s</body></html>
""" % (time.strftime('%d %b %Y'), min(RECENT, len(entries)), recent, len(entries), '\n'.join(topics),
       ''.join(opts), _evals(entries, sim, dol, pages), cols, SCRIPT)
    (here / 'experiments.html').write_text(page, encoding='utf-8')
    return shown
