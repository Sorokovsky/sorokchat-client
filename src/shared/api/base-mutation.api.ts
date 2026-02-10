import { inject } from '@angular/core';
import type {
  CreateMutationOptions,
  DefaultError,
  MutationFunction,
} from '@tanstack/angular-query-experimental';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

import type { BaseMutation } from '../models';

export function injectBaseMutation<TData = unknown, TError = DefaultError, TVariables = void>(
  keys: string[],
  mutationFn: MutationFunction<TData, TVariables>,
  refreshKeys: string[] = [],
): BaseMutation<TData, TError, TVariables> {
  const client: QueryClient = inject(QueryClient);
  return injectMutation(
    (): CreateMutationOptions<TData, TError, TVariables> => ({
      mutationKey: keys,
      mutationFn,
      async onSuccess(): Promise<void> {
        await client.resetQueries({ queryKey: refreshKeys });
      },
    }),
  );
}
