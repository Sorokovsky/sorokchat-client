import type { CreateQueryOptions, QueryFunction } from '@tanstack/angular-query-experimental';
import { injectQuery } from '@tanstack/angular-query-experimental';

import type { BaseQuery } from '../models';

export function injectBaseQuery<TInput, TOutput, TError = Error>(
  keys: string[],
  queryFunction: QueryFunction<TInput, string[], TOutput>,
): BaseQuery<TOutput, TError> {
  return injectQuery(
    (): CreateQueryOptions<TInput, TError, TOutput, string[]> => ({
      queryKey: keys,
      queryFn: queryFunction,
    }),
  );
}
