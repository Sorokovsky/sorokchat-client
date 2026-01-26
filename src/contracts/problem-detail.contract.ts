import {z as zod} from 'zod';

export const ProblemDetailSchema = zod.object({
  type: zod.optional(zod.string()),
  title: zod.optional(zod.string()),
  status: zod.number(),
  detail: zod.optional(zod.string()),
  instance: zod.optional(zod.string()),
  errors: zod.optional(zod.object())
});

export type ProblemDetail = zod.infer<typeof ProblemDetailSchema>;
