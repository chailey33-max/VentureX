/* global console, process */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, extname, relative } from 'node:path';

const MAX_APP_TSX_LINES = Number(process.env.MAX_APP_TSX_LINES || 4000);
const MAX_TS_FILE_LINES = Number(process.env.MAX_TS_FILE_LINES || 900);
const ROOT = process.cwd();

const TARGET_EXTENSIONS = new Set(['.ts', '.tsx']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.'))
        continue;
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (TARGET_EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function countLines(path) {
  const content = await readFile(path, 'utf8');
  return content.split('\n').length;
}

async function run() {
  const srcPath = join(ROOT, 'src');
  const tsFiles = await walk(srcPath);
  const violations = [];

  for (const filePath of tsFiles) {
    const lines = await countLines(filePath);
    const relativePath = relative(ROOT, filePath).replaceAll('\\', '/');

    if (relativePath === 'src/data/ideas.ts') {
      continue;
    }

    if (relativePath === 'src/App.tsx') {
      if (lines > MAX_APP_TSX_LINES) {
        violations.push(`${relativePath} has ${lines} lines (max ${MAX_APP_TSX_LINES})`);
      }
      continue;
    }

    if (lines > MAX_TS_FILE_LINES) {
      violations.push(`${relativePath} has ${lines} lines (max ${MAX_TS_FILE_LINES})`);
    }
  }

  // Ensure this script is not stale in repos without src/ paths.
  await stat(srcPath);

  if (violations.length > 0) {
    console.error('File guardrail check failed:');
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  console.log('File guardrail check passed.');
}

run().catch((error) => {
  console.error('Failed to run file guardrail check:', error);
  process.exit(1);
});
