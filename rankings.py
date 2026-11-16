"""The fixed opponents and the score loaders, shared by models.py, experiments.py and curves.py. (This was the
rankings page until 2026-11-16; the rankings are now the sortable columns of models.html.)

Scores come from the logs the SteveTheBot scripts write: logs/yardstick.csv from sim/eval_vs_bot.py, and
logs/**/*_cpu9_games.csv from run.py --games-log in Dolphin. Several score runs of the same model and opponent are
pooled (games added up).
"""
import csv
import html
from collections import defaultdict

# (id, title, what it is, source, games a score needs to count, unused)
BOARDS = [
    ('cpu9', 'In-game CPU, level 9 (Dolphin)',
     'The real game in Slippi Dolphin against Melee\'s own hardest computer player. The most trustworthy test, but '
     'slow, so only some models have played it. The better models win nearly every game, so this ranking goes by '
     'stock lead.', 'dolphin', 20, True),
    ('t21', 'Frozen T21L6Cs4 (simulator)',
     'A saved copy of T21L6Cs4, the strongest model of its time, that does not learn. The hardest opponent '
     'the newer models are scored against; T21L6Cs4 itself is the reference and is not ranked.',
     'model_T21L6Cs4_c04_seeds1000', 50, True),
    ('pool2', 'Frozen pool 2 (simulator)',
     'The routine yardstick since 15 Nov 2026: four saved models of rising strength that do not learn. T4V2s3 '
     '(kept from the old pool), T4HumP1 (started from human replays), and the ladder run T43Lad at a quarter and '
     'at the end of its 12-times-length training; 50 games against each, pooled. All play with the current '
     'controls. The old pool (next table) was used up: the long runs won about 9 games in 10 against it. Only '
     'models that played all four are ranked.',
     ['model_%s_seeds1000' % m for m in ('T4V2s3_c04', 'T4HumP1', 'T43Lad_c12', 'T43Lad_c48')], 200, True),
    ('t4v2', 'Frozen T4V2, four seeds (simulator)',
     'The four T4V2 runs (seeds 3 to 6), saved and not learning; 100 games against each, pooled. They play with the '
     'current controls (a decision every frame, acting on what it saw 11 frames earlier, like a human reaction), so '
     'this is the yardstick for models with those controls: they win almost nothing against frozen T21L6Cs4, which '
     'reacts without delay. The T4V2 runs themselves are the opponent and are not ranked.',
     ['model_T4V2s%d_c04_seeds1000' % s for s in (3, 4, 5, 6)], 400, True),
    ('ppo8', 'Frozen PPO8Self (simulator)',
     'A saved copy of PPO8Self that does not learn. The yardstick for the older models; the newer ones beat it '
     'almost every game, so it no longer tells them apart.', 'model_PPO8Self_c04_seeds1000', 50, False),
    ('bot9', 'Scripted bot, level 9 (simulator)',
     'A hand-written Falcon. Most trained models since PPO beat it nearly every game, so this ranking goes by '
     'stock lead.',
     'scripted_bot_level9_seeds1000', 50, False),
]


def _sim_scores(src):
    """{yardstick: {model: [games, won, taken, lost, first day]}} from logs/yardstick.csv."""
    out = defaultdict(lambda: defaultdict(lambda: [0, 0, 0.0, 0.0, '9999']))
    path = src / 'logs' / 'yardstick.csv'
    if not path.is_file():
        return out
    for r in csv.DictReader(path.open(encoding='utf-8')):
        g = int(r['games'])
        s = out[r['yardstick']][r['model']]
        s[0] += g
        s[1] += int(r['won'])
        s[2] += float(r['taken_per_game']) * g
        s[3] += float(r['lost_per_game']) * g
        s[4] = min(s[4], r['time'][:10])
    return out


def _dolphin_scores(src):
    """{model: [games, won, taken, lost, first day]} from every *_cpu9_games.csv under logs/."""
    out = defaultdict(lambda: [0, 0, 0.0, 0.0, '9999'])
    for p in sorted((src / 'logs').rglob('*_cpu9_games.csv')):
        for r in csv.DictReader(p.open(encoding='utf-8')):
            if r.get('cpu_level') != '9':
                continue
            s = out[r['model']]
            s[0] += 1
            s[1] += int(r['won'])
            s[2] += float(r['stocks_taken'])
            s[3] += float(r['stocks_lost'])
            s[4] = min(s[4], r['time'][:10])
    return out


def _links(pages, short):
    """Links to a model's scenario and game-report pages; pages: [(href, short text, long text)]."""
    return ' '.join('<a class="pg" href="%s">%s</a>' % (html.escape(h), html.escape(s if short else l))
                    for h, s, l in pages)
