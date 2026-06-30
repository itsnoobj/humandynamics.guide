#!/usr/bin/env node
/**
 * Quiz Generator
 * 
 * Takes a mission JSON (story content) and generates a quiz JSON with
 * appropriate template types. Uses an LLM prompt format so any LLM can
 * generate the quiz from the story.
 * 
 * Usage:
 *   node tools/generate-quiz.mjs content/chapters/part-02/31.json
 *   
 * Or copy the prompt and paste into any LLM (Claude, ChatGPT, etc.)
 * 
 * The script outputs:
 *   1. A ready-to-use prompt for any LLM
 *   2. The expected output format
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, basename } from 'path';

const missionPath = process.argv[2];

if (!missionPath) {
  console.log(`
╔══════════════════════════════════════════════════╗
║         QUIZ GENERATOR                           ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  Usage:                                          ║
║    node tools/generate-quiz.mjs <mission.json>   ║
║                                                  ║
║  What it does:                                   ║
║    1. Reads your mission JSON (the story)        ║
║    2. Generates an LLM prompt                    ║
║    3. Outputs quiz JSON in the correct schema    ║
║                                                  ║
║  You can either:                                 ║
║    - Pipe the prompt to an LLM API               ║
║    - Copy/paste it into Claude or ChatGPT        ║
║                                                  ║
╚══════════════════════════════════════════════════╝
  `);
  process.exit(0);
}

const mission = JSON.parse(readFileSync(resolve(missionPath), 'utf-8'));

// Extract key content from mission
const situation = mission.sections.find(s => s.type === 'situation')?.content || '';
const story = mission.sections.find(s => s.type === 'story')?.content || '';
const contrast = mission.sections.find(s => s.type === 'contrast')?.content || '';
const principle = mission.sections.find(s => s.type === 'principle')?.content || '';
const psychology = mission.sections.find(s => s.type === 'psychology')?.content || '';
const move = mission.sections.find(s => s.type === 'move')?.content || '';
const trap = mission.sections.find(s => s.type === 'trap')?.content || '';

const prompt = `You are generating a quiz for an interactive learning app. Given a story/lesson, create challenges using EXACTLY the JSON format below.

## The Mission

Title: ${mission.title}
Forces: ${mission.forces.join(', ')}

### Situation
${situation}

### Story
${story}

### Contrast
${contrast}

### Principle
${principle}

### Psychology
${psychology}

### The Move
${move}

### The Trap
${trap}

---

## Your Task

Generate a quiz JSON with 3-5 challenges using a MIX of these template types:

### Template 1: scenario-choice
When to use: "What would you do?" — present a realistic workplace/life situation with 3 options.
\`\`\`json
{
  "type": "scenario-choice",
  "situation": "A realistic scenario the reader might face (1-2 sentences)",
  "options": [
    { "text": "Wrong option A (plausible but flawed)", "correct": false, "feedback": "Why this doesn't work (1-2 sentences tied to the principle)" },
    { "text": "The correct approach", "correct": true, "feedback": "Why this works (reference the principle)" },
    { "text": "Wrong option B (common mistake)", "correct": false, "feedback": "Why this backfires" }
  ]
}
\`\`\`

### Template 2: spot-the-force
When to use: Present a scenario and ask which human force (ego, fear, identity, status, incentives, power, trust, scarcity, uncertainty, reciprocity) is driving the behavior.
\`\`\`json
{
  "type": "spot-the-force",
  "situation": "A scenario or real-world example (from the story or a new one)",
  "question": "Which force is primarily driving this behavior?",
  "options": [
    { "text": "Wrong force A", "correct": false, "feedback": "Why it's not this one" },
    { "text": "Correct force", "correct": true, "feedback": "Why this is the primary driver" },
    { "text": "Wrong force B", "correct": false, "feedback": "Why it's not this one" }
  ]
}
\`\`\`

### Template 3: card-flip
When to use: Challenge a common belief/assumption and reveal the principle.
\`\`\`json
{
  "type": "card-flip",
  "front": "A common belief or assumption that sounds reasonable but is wrong/incomplete",
  "back": "The actual principle — the insight that corrects or deepens the belief (2-3 sentences)"
}
\`\`\`

### Template 4: drag-match
When to use: Test if they know the correct ORDER of steps (from "The Move" section).
\`\`\`json
{
  "type": "drag-match",
  "instruction": "Put these steps in the right order:",
  "items": [
    { "id": "a", "text": "Step 1 text" },
    { "id": "b", "text": "Step 2 text" },
    { "id": "c", "text": "Step 3 text" },
    { "id": "d", "text": "Step 4 text" }
  ],
  "correctOrder": ["a", "b", "c", "d"]
}
\`\`\`

### Template 5: before-after
When to use: Show two approaches to the same situation — one that works, one that doesn't.
\`\`\`json
{
  "type": "before-after",
  "context": "Brief setup of the situation (1 sentence)",
  "scenarioA": { "label": "Person/Manager A", "text": "What they did (2-3 sentences, the WRONG approach)" },
  "scenarioB": { "label": "Person/Manager B", "text": "What they did (2-3 sentences, the RIGHT approach)" },
  "correctScenario": "B",
  "explanation": "Why B works and A doesn't (tied to the principle, 1-2 sentences)"
}
\`\`\`

---

## Rules

1. Use AT LEAST 3 different template types (variety matters)
2. scenario-choice should always be first (warm up with a familiar format)
3. The challenges should test UNDERSTANDING of the principle, not memorization
4. Feedback should teach — not just say "wrong", explain WHY
5. Use realistic, specific scenarios (not abstract)
6. The principle and reflection should directly match the mission's core lesson

## Output Format

Output ONLY valid JSON (no markdown, no explanation, just the JSON):

\`\`\`json
{
  "chapterId": "${mission.id}",
  "challenges": [
    // 3-5 challenges here, mixed templates
  ],
  "principle": {
    "text": "The core principle in one sentence",
    "subtext": "A supporting explanation (1-2 sentences)"
  },
  "reflection": "A personal question for the reader to sit with (no right answer)"
}
\`\`\`
`;

// Output
const outputPath = missionPath.replace('.json', '.quiz-prompt.txt');
writeFileSync(outputPath, prompt);

console.log(`
✓ Prompt generated: ${outputPath}

Next steps:
  1. Copy the prompt from ${basename(outputPath)}
  2. Paste into Claude, ChatGPT, or any LLM
  3. Save the output as ${missionPath.replace('.json', '.quiz.json')}
  4. Validate: cd content/schema && npm run validate

Or if you have an API key, pipe it directly:
  cat ${outputPath} | llm -m claude-sonnet "Generate the quiz" > ${missionPath.replace('.json', '.quiz.json')}
`);
