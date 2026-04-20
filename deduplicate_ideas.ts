import * as fs from 'fs';
import { BusinessIdea } from './src/types';

// This script deduplicates the BUSINESS_IDEAS in src/data/ideas.ts
// It's a bit tricky because it's a TS file, so we'll do some regex/string manipulation

const filePath = 'src/data/ideas.ts';
const content = fs.readFileSync(filePath, 'utf-8');

// Extract the array content
const arrayMatch = content.match(/export const BUSINESS_IDEAS: BusinessIdea\[\] = (\[[\s\S]*\]);/);
if (!arrayMatch) {
  console.error('Could not find BUSINESS_IDEAS array');
  process.exit(1);
}

const arrayStr = arrayMatch[1];

// We can't easily parse this as JSON because it's JS/TS (single quotes, no quotes on keys, etc.)
// So we'll use a more manual approach to split the objects

const ideas: string[] = [];
let bracketCount = 0;
let currentIdea = '';
let inArray = false;

for (let i = 0; i < arrayStr.length; i++) {
  const char = arrayStr[i];
  if (char === '[') {
    if (!inArray) {
      inArray = true;
      continue;
    }
  }
  if (char === ']') {
    if (bracketCount === 0) {
      inArray = false;
      continue;
    }
  }
  
  if (char === '{') bracketCount++;
  if (char === '}') bracketCount--;
  
  currentIdea += char;
  
  if (bracketCount === 0 && currentIdea.trim().endsWith('},')) {
    ideas.push(currentIdea.trim());
    currentIdea = '';
  } else if (bracketCount === 0 && currentIdea.trim().endsWith('}')) {
    ideas.push(currentIdea.trim());
    currentIdea = '';
  }
}

console.log(`Found ${ideas.length} ideas`);

const uniqueIdeas: string[] = [];
const seenTitles = new Set<string>();

for (const ideaStr of ideas) {
  const titleMatch = ideaStr.match(/title: '(.*?)'/);
  if (titleMatch) {
    const title = titleMatch[1];
    if (!seenTitles.has(title)) {
      seenTitles.add(title);
      uniqueIdeas.push(ideaStr);
    }
  }
}

console.log(`Unique ideas: ${uniqueIdeas.length}`);

const newArrayStr = `[\n  ${uniqueIdeas.join(',\n  ')}\n]`;
const newContent = content.replace(arrayStr, newArrayStr);

fs.writeFileSync(filePath, newContent);
console.log('Deduplicated src/data/ideas.ts');
