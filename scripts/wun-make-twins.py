# wun-make-twins.py — generate plain-Markdown twins of Waking Up New posts
# What it does: for each post in the local mirror's _posts/, writes posts/<slug>.md
#   (body exactly as written, small header: title, author, date, canonical URL,
#   plus the takeaway block when the post carries one). Twins are served as
#   static files by Jekyll because they have no front matter.
# Usage: python3 wun-make-twins.py [mirror-dir]
import re, sys
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
out_dir = root / 'posts'
out_dir.mkdir(exist_ok=True)
count = 0
for post in sorted((root / '_posts').glob('*.md')):
    text = post.read_text()
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m:
        continue
    fm, body = m.group(1), text[m.end():]
    def field(name):
        mm = re.search(rf'^{name}:\s*"?([^"\n]+)"?\s*$', fm, re.M)
        return mm.group(1).strip() if mm else ''
    slug = post.stem.split('-', 3)[3] if len(post.stem.split('-')) > 3 else post.stem
    url = f"https://wakingupnew.com/{slug}/"
    header = (f"# {field('title')}\n\n"
              f"By {field('author')} · {field('date')} · {field('form')}\n"
              f"Canonical: {url}\n\n---\n\n")
    twin = header + body.strip() + "\n"
    tak = re.search(r'^takeaway:\s*\|\n((?:  .*\n?)+)', fm, re.M)
    if tak:
        block = '\n'.join(line[2:] for line in tak.group(1).splitlines())
        twin += f"\n## Take this with you\n\n{block.strip()}\n"
    (out_dir / f"{slug}.md").write_text(twin)
    count += 1
    print('twin:', out_dir / f"{slug}.md", len(twin), 'bytes')
print('twins written:', count)
