import { z } from 'zod';

/** One selectable option in a scenario-choice or spot-the-force challenge. */
export const challengeOptionSchema = z.object({
  text: z.string().min(1),
  correct: z.boolean(),
  feedback: z.string().min(1),
});

export type ChallengeOption = z.infer<typeof challengeOptionSchema>;

/** Pick the best response to a workplace situation. */
export const scenarioChoiceSchema = z.object({
  type: z.literal('scenario-choice'),
  situation: z.string().min(1),
  options: z.array(challengeOptionSchema).min(2),
});

/** Identify which human force is driving the described behavior. */
export const spotTheForceSchema = z.object({
  type: z.literal('spot-the-force'),
  situation: z.string().min(1),
  question: z.string().min(1),
  options: z.array(challengeOptionSchema).min(2),
});

/** Flip a card to reveal the answer/principle on the back. */
export const cardFlipSchema = z.object({
  type: z.literal('card-flip'),
  front: z.string().min(1),
  back: z.string().min(1),
});

/** Discriminated union over the supported challenge templates. */
export const quizChallengeSchema = z.discriminatedUnion('type', [
  scenarioChoiceSchema,
  spotTheForceSchema,
  cardFlipSchema,
]);

export type QuizChallenge = z.infer<typeof quizChallengeSchema>;

/** The principle a quiz reinforces on completion. */
export const principleSchema = z.object({
  text: z.string().min(1),
  subtext: z.string().min(1),
});

export type Principle = z.infer<typeof principleSchema>;

/** Runtime schema for a quiz JSON document. */
export const quizSchema = z.object({
  chapterId: z.string().min(1),
  challenges: z.array(quizChallengeSchema).nonempty('a quiz must have at least one challenge'),
  principle: principleSchema,
  reflection: z.string().min(1),
});

export type QuizDocument = z.infer<typeof quizSchema>;
