import type { CreateQueryResult } from '@tanstack/angular-query-experimental';

import type { ProblemDetails } from './problem-details.schema';

export type BaseQuery<TData> = CreateQueryResult<TData, ProblemDetails>;
