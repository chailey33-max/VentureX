import * as fs from 'fs';

const filePath = 'src/data/ideas.ts';
const content = fs.readFileSync(filePath, 'utf-8');

// 1. Remove the extra commas like "  ,  "
// Use a more flexible regex to catch commas between objects
const cleanedContent = content.replace(/},\s*,\s*{/g, '},\n  {');

// 2. Extract the array content
const arrayMatch = cleanedContent.match(/export const BUSINESS_IDEAS: BusinessIdea\[\] = (\[[\s\S]*\]);/);
if (!arrayMatch) {
  console.error('Could not find BUSINESS_IDEAS array');
  process.exit(1);
}

const arrayStr = arrayMatch[1];

// 3. Split the objects more robustly
const ideas: string[] = [];
let bracketCount = 0;
let currentIdea = '';
let inArray = false;

// We skip the first '[' and last ']' of the array
const innerArrayStr = arrayStr.trim().slice(1, -1).trim();

for (let i = 0; i < innerArrayStr.length; i++) {
  const char = innerArrayStr[i];
  
  if (char === '{') bracketCount++;
  if (char === '}') bracketCount--;
  
  currentIdea += char;
  
  if (bracketCount === 0 && currentIdea.trim() !== '') {
    // If we hit a comma at the top level, it's a separator
    if (char === ',') {
      const idea = currentIdea.trim().slice(0, -1).trim();
      if (idea.startsWith('{') && idea.endsWith('}')) {
        ideas.push(idea);
      }
      currentIdea = '';
    }
  }
}
// Push the last one if it didn't end with a comma
if (currentIdea.trim() !== '') {
  const idea = currentIdea.trim();
  if (idea.startsWith('{') && idea.endsWith('}')) {
    ideas.push(idea);
  }
}

console.log(`Found ${ideas.length} ideas after cleaning`);

// 4. Deduplicate by title
const uniqueIdeas: string[] = [];
const seenTitles = new Set<string>();

for (const ideaStr of ideas) {
  // Try to match title: '...' or title: "..."
  const titleMatch = ideaStr.match(/title:\s+['"](.*?)['"]/);
  if (titleMatch) {
    const title = titleMatch[1].trim().toLowerCase(); // Case insensitive
    if (!seenTitles.has(title)) {
      seenTitles.add(title);
      uniqueIdeas.push(ideaStr);
    }
  } else {
    // If no title found, keep it anyway but log it
    console.warn('Could not find title for idea:', ideaStr.substring(0, 50));
    uniqueIdeas.push(ideaStr);
  }
}

console.log(`Unique ideas: ${uniqueIdeas.length}`);

// 5. Re-index IDs and format
const finalIdeas = uniqueIdeas.map((ideaStr, index) => {
  // Replace id: '...' with the new index
  return ideaStr.replace(/id:\s+['"](.*?)['"]/, `id: '${index + 1}'`);
});

const newArrayStr = `[\n  ${finalIdeas.join(',\n  ')}\n]`;
const finalContent = cleanedContent.replace(arrayStr, newArrayStr);

fs.writeFileSync(filePath, finalContent);
console.log('Successfully cleaned and deduplicated src/data/ideas.ts');
