import type { CreateQueryResult } from '@tanstack/angular-query-experimental';

import type { ProblemDetails } from '@/shared';

export type BaseQuery<TData> = CreateQueryResult<TData, ProblemDetails>;
