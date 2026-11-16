"""The milestones: one model per change made to the bot, in the order the changes were made (CATALOG), and the
scenario scores (SCEN, _scenarios). models.py shows them ("Milestones" filter, the scenario table of a row) and
curves.py draws the landmarks from them. (This was the catalog page until 2026-11-16.)
"""
import csv
from collections import defaultdict

# (raw model name, change, what the change was)
CATALOG = [
    ('random', 'Nothing learned', 'Presses one of the 54 actions at random every decision: the floor.'),
    ('SimBase_c08', 'The 2017 learner', 'The original 2017 actor-critic, unchanged, trained 48,000 updates in the '
     'simulator against itself.'),
    ('PPOSelf_c04', 'PPO', 'The learning method replaced by PPO with GAE (64 matches at once), same network; '
     'trained against itself.'),
    ('PPOBot_c04', 'PPO, against the scripted bot', 'As PPOSelf, but trained against the hand-written scripted '
     'bot instead of itself.'),
    ('PPO8Self_c04', 'Network fixes', 'PPO with four network fixes (activation, critic output, initialisation, '
     'Adam with gradient clipping); trained against itself.'),
    ('PPO8Bot_c04', 'Network fixes, against the scripted bot', 'As PPO8Self, trained against the scripted bot.'),
    ('PPO8Bot_c04_edit_rec', 'Hand-edited weights', 'PPO8Bot with its choices sharpened by hand and a wired-in '
     'recovery circuit; no training.'),
    ('T9Prev', 'Own last action as input', 'The bot also sees the action it chose last time (optional, not the '
     'default).'),
    ('T22EmbSmall3_c04', 'Animation embedding', 'Each animation becomes 32 learned numbers instead of one of 384 '
     'switches (tried as default, then dropped).'),
    ('T21L6Cs4_c04', 'Twice the learning rate', 'Learning rate 0.0006 held constant instead of 0.0003 lowered to '
     'zero: the biggest single gain. The reference opponent for the scenario scores.'),
    ('T22LongBase7_c08', 'Twice as long', 'The T21L6Cs4 settings trained for 5,880 updates instead of 2,940.'),
    ('T16F1D15s3_c04', 'Every frame, human reaction delay', 'A decision every frame instead of every 2, acting on '
     'what it saw 15 frames ago (a human-like delay); far weaker at this training length.'),
    ('T17F54s4_c04', 'Every frame, 11-frame delay', 'The delay set to 11 frames (0.19 s), the current default '
     'controls.'),
    ('T4V2s3_c04', 'Input version 2', 'Inputs rebuilt from what both the simulator and human replays record, the '
     'groundwork for learning from replays.'),
    ('T4HumP1_c04', 'Start from human replays', 'First copies 1,236 human Falcon ditto replays (imitation), then '
     'trains against itself with PPO from that start; the best delayed model against the in-game CPU.'),
]

REF = 'T21L6Cs4_c04'
# (column, metric in logs/scenario.csv, what it measures)
SCEN = [
    ('Edgeguard', 'edgeguard v2', 'opponent offstage: share of starts where the model takes the stock'),
    ('Recovery', 'recovery v2', 'model offstage: share of starts where it gets back and can act'),
    ('Follow-up', 'follow-up v2 one more hit', 'after landing a hit: share with at least one more hit'),
    ('Whiff punish', 'whiff punish', 'opponent missed a move nearby: share the model punishes'),
    ('First hit', 'first hit by the model', 'from neutral: share where the model lands the first hit'),
    ('Shielding', 'shield: not hit', 'a move coming at the model: share where it is not hit'),
]


def _scenarios(src):
    """{(model, metric): mean value of the model's latest run against frozen T21L6Cs4}."""
    rows = defaultdict(list)
    path = src / 'logs' / 'scenario.csv'
    if path.is_file():
        for r in csv.DictReader(path.open(encoding='utf-8')):
            if r['opponent'] == REF:
                rows[(r['model'], r['metric'])].append((r['time'], float(r['value'])))
    out = {}
    for key, vals in rows.items():
        last = max(t for t, _ in vals)
        v = [x for t, x in vals if t == last]
        out[key] = sum(v) / len(v)
    return out
