import fs from 'node:fs';
import path from 'node:path';

const distAssetsDir = path.join(process.cwd(), 'dist', 'assets');
const maxJsBytes = Number(process.env.BUNDLE_BUDGET_JS_BYTES || 950_000);

if (!fs.existsSync(distAssetsDir)) {
  console.error('Bundle budget check failed: dist/assets does not exist. Run build first.');
  process.exit(1);
}

const jsFiles = fs.readdirSync(distAssetsDir).filter((file) => file.endsWith('.js'));
if (jsFiles.length === 0) {
  console.error('Bundle budget check failed: no JS bundle found in dist/assets.');
  process.exit(1);
}

let largest = { name: '', size: 0 };
for (const file of jsFiles) {
  const fullPath = path.join(distAssetsDir, file);
  const size = fs.statSync(fullPath).size;
  if (size > largest.size) {
    largest = { name: file, size };
  }
}

if (largest.size > maxJsBytes) {
  console.error(
    `Bundle budget exceeded: ${largest.name} is ${largest.size} bytes, limit is ${maxJsBytes} bytes.`
  );
  process.exit(1);
}

console.log(
  `Bundle budget passed: largest JS bundle ${largest.name} is ${largest.size} bytes (limit ${maxJsBytes}).`
);
