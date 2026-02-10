import type { CreateMutationResult } from '@tanstack/angular-query-experimental';

import type { ProblemDetails } from '@/shared';

export type BaseMutation<TData, TVariables> = CreateMutationResult<
  TData,
  ProblemDetails,
  TVariables
>;
