/**
 * Content validation script.
 *
 * Recursively reads every JSON file under content/chapters/, validates each
 * against the appropriate schema (quiz files match `*.quiz.json`, everything
 * else is treated as a chapter), prints a per-file report, and exits with a
 * non-zero status if any file fails.
 *
 * Run with: tsx validate.ts   (or: ts-node validate.ts)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { chapterSchema } from './chapter.schema.js';
import { quizSchema } from './quiz.schema.js';

const here = dirname(fileURLToPath(import.meta.url));
const chaptersDir = resolve(here, '..', 'chapters');

/** Recursively collect all `.json` files beneath a directory. */
function collectJsonFiles(dir: string): string[] {
  const out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectJsonFiles(full));
    } else if (entry.endsWith('.json')) {
      out.push(full);
    }
  }
  return out;
}

function schemaFor(file: string): { name: string; schema: z.ZodTypeAny } {
  return file.endsWith('.quiz.json')
    ? { name: 'quiz', schema: quizSchema }
    : { name: 'chapter', schema: chapterSchema };
}

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join('.') : '(root)';
      return `      - ${path}: ${issue.message}`;
    })
    .join('\n');
}

function main(): void {
  const files = collectJsonFiles(chaptersDir).sort();

  if (files.length === 0) {
    console.warn(`No JSON files found under ${relative(process.cwd(), chaptersDir)}`);
    return;
  }

  let failures = 0;

  for (const file of files) {
    const rel = relative(process.cwd(), file);
    const { name, schema } = schemaFor(file);

    let parsed: unknown;
    try {
      parsed = JSON.parse(readFileSync(file, 'utf8'));
    } catch (err) {
      failures += 1;
      console.error(`✗ ${rel} [${name}] — invalid JSON: ${(err as Error).message}`);
      continue;
    }

    const result = schema.safeParse(parsed);
    if (result.success) {
      console.log(`✓ ${rel} [${name}]`);
    } else {
      failures += 1;
      console.error(`✗ ${rel} [${name}] — schema validation failed:`);
      console.error(formatIssues(result.error));
    }
  }

  console.log('');
  if (failures > 0) {
    console.error(`Validation failed: ${failures} of ${files.length} file(s) invalid.`);
    process.exit(1);
  }
  console.log(`Validation passed: ${files.length} file(s) valid.`);
}

main();
