import {type CreateQueryResult, injectQuery, queryOptions} from '@tanstack/angular-query-experimental';
import {type ProblemDetail} from '@/shared/models/problem-detail.contract';

export type BaseQuery<T> = CreateQueryResult<T, ProblemDetail>;

export type QueryFunction<T> = (...args: unknown[]) => Promise<T>;

export function injectBaseQuery<T>(
  keys: string[],
  queryFunction: QueryFunction<T>,
  retry: number | boolean = false
): BaseQuery<T> {
  return injectQuery(() => queryOptions({
    queryKey: keys,
    queryFn: queryFunction,
    retry,
  }));
}
