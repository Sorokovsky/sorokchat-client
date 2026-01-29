import {CreateQueryResult, injectQuery, queryOptions} from '@tanstack/angular-query-experimental';
import {ProblemDetail} from '@/contracts/problem-detail.contract';

export type BaseQuery<T> = CreateQueryResult<T, ProblemDetail>;

export type Function<T> = (...args: unknown[]) => Promise<T>;

export function injectBaseQuery<T>(
  keys: string[],
  queryFunction: Function<T>,
  retry: number | boolean = false
): BaseQuery<T> {
  return injectQuery(() => queryOptions({
    queryKey: keys,
    queryFn: queryFunction,
    retry,
  }));
}
