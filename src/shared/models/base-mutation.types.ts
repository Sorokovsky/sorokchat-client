import type { CreateMutationResult } from '@tanstack/angular-query-experimental';

import type { ProblemDetails } from './problem-details.schema';

export type BaseMutation<TData, TVariables> = CreateMutationResult<
  TData,
  ProblemDetails,
  TVariables
>;
