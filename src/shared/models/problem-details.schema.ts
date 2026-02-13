import { z as zod } from 'zod';

export const ProblemDetailsSchema = zod
  .object({
    type: zod.string().url().optional(),
    title: zod.string(),
    status: zod.number(),
    detail: zod.string(),
    instance: zod.string().optional(),
  })
  .and(zod.record(zod.string(), zod.unknown()));

export type ProblemDetails = zod.infer<typeof ProblemDetailsSchema>;
