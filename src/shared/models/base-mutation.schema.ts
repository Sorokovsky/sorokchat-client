import type { CreateMutationResult } from '@tanstack/angular-query-experimental';

export type BaseMutation<TData, TError, TVariables> = CreateMutationResult<
  TData,
  TError,
  TVariables
>;
