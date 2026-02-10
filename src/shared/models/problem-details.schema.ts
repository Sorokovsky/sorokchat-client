import { z as zod } from 'zod';

export const ProblemDetailsSchema = zod
  .object({
    type: zod.string().url().optional(),
    title: zod.string().optional(),
    status: zod.number().optional(),
    detail: zod.string().optional(),
    instance: zod.string().optional(),
  })
  .and(zod.record(zod.string(), zod.unknown()));

export type ProblemDetails = zod.infer<typeof ProblemDetailsSchema>;
