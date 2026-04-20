import re

with open('/src/data/ideas.ts', 'r') as f:
    content = f.read()

# Remove image property: image: '...', or image: "...", with optional trailing comma
new_content = re.sub(r'\s*image:\s*[\'"].*?[\'"],?\n', '\n', content)

with open('/src/data/ideas.ts', 'w') as f:
    f.write(new_content)
