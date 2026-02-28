import type { InferOutput } from 'valibot';
import { number, objectWithRest, optional, pipe, string, unknown, url } from 'valibot';

export const ProblemDetailsSchema = objectWithRest(
  {
    type: optional(pipe(string(), url())),
    title: string(),
    status: number(),
    detail: string(),
    instance: optional(string()),
  },
  unknown(),
);

export type ProblemDetails = InferOutput<typeof ProblemDetailsSchema>;
