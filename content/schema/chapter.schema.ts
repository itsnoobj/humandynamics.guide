import { z } from 'zod';

/**
 * Section types that make up a chapter's narrative arc.
 * Mirrors the chapter template: situation → story → contrast → principle →
 * psychology → trap → move.
 */
export const sectionTypeSchema = z.enum([
  'situation',
  'story',
  'contrast',
  'principle',
  'psychology',
  'trap',
  'move',
]);

export type SectionType = z.infer<typeof sectionTypeSchema>;

/** A single titled block of chapter content. */
export const chapterSectionSchema = z.object({
  type: sectionTypeSchema,
  title: z.string().optional(),
  content: z.string().min(1, 'section content must not be empty'),
});

export type ChapterSection = z.infer<typeof chapterSectionSchema>;

/** Runtime schema for a chapter JSON document. */
export const chapterSchema = z.object({
  id: z.string().min(1),
  part: z.number().int(),
  section: z.string().min(1),
  title: z.string().min(1),
  forces: z.array(z.string()).nonempty('a chapter must list at least one force'),
  connections: z.array(z.string()),
  audio: z.string().min(1),
  visual: z.string().min(1),
  sections: z.array(chapterSectionSchema).nonempty('a chapter must have at least one section'),
});

export type ChapterDocument = z.infer<typeof chapterSchema>;
