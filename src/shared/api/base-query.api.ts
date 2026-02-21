import type { CreateQueryOptions } from '@tanstack/angular-query-experimental';
import { injectQuery } from '@tanstack/angular-query-experimental';

import type { BaseQuery, ProblemDetails } from '../models';

export function injectBaseQuery<TOutput>(
  keys: string[],
  queryFunction: () => Promise<TOutput> | TOutput,
  retry: boolean | number = false,
  enabled: boolean = true,
): BaseQuery<TOutput> {
  return injectQuery(
    (): CreateQueryOptions<TOutput, ProblemDetails, TOutput, string[]> => ({
      queryKey: keys,
      queryFn: queryFunction,
      retry: retry,
      enabled,
    }),
  );
}
