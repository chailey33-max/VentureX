const fs = require('fs');
const path = '/src/data/ideas.ts';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/\s*image:\s*['"].*?['"],?\n/g, '\n');
fs.writeFileSync(path, content);
console.log('Images removed successfully');
