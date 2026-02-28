import { inject } from '@angular/core';
import type { CreateMutationOptions, MutationFunction } from '@tanstack/angular-query-experimental';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { toast } from 'ngx-sonner';

import type { BaseMutation, ProblemDetails } from '../models';

export function injectBaeMutation<TData = unknown, TVariables = void>(
  keys: string[],
  mutationFunction: MutationFunction<TData, TVariables>,
  refreshKeys: string[] = [],
): BaseMutation<TData, TVariables> {
  const client: QueryClient = inject(QueryClient);
  return injectMutation(
    (): CreateMutationOptions<TData, ProblemDetails, TVariables> => ({
      mutationKey: keys,
      mutationFn: mutationFunction,
      async onSettled(): Promise<void> {
        if (refreshKeys.length > 0) {
          client
            .getQueryCache()
            .findAll({ queryKey: refreshKeys, exact: false })
            .forEach((query) => query.setData(null));
          await client.invalidateQueries({ queryKey: refreshKeys });
        }
      },
      onError(error: ProblemDetails): void {
        toast.error(error.title);
      },
    }),
  );
}
