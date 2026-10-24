# wun-check-twins.py — verify every Markdown twin matches its post
# What it does: regenerates all twins from _posts/ into a temp dir using
#   wun-make-twins.py (the single source of truth for twin format) and
#   byte-compares the result against the committed posts/ twins.
# Usage: python3 scripts/wun-check-twins.py [repo-root]
# Exit code 0 = all twins current; 1 = drift found (names printed).
import subprocess, sys, tempfile, shutil
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
gen = root / 'scripts' / 'wun-make-twins.py'
with tempfile.TemporaryDirectory() as td:
    tmp = Path(td)
    shutil.copytree(root / '_posts', tmp / '_posts')
    r = subprocess.run(['python3', str(gen), str(tmp)], capture_output=True, text=True)
    if r.returncode != 0:
        print('generator failed:', r.stdout, r.stderr); sys.exit(1)
    fresh = {p.name: p.read_bytes() for p in (tmp / 'posts').glob('*.md')}
    live = {p.name: p.read_bytes() for p in (root / 'posts').glob('*.md')}
    drift = [n for n in sorted(set(fresh) | set(live)) if fresh.get(n) != live.get(n)]
    if drift:
        print('TWINS DRIFTED:', *drift, sep='\n  ')
        sys.exit(1)
    print(f'twins OK: {len(live)} twins match their posts')
