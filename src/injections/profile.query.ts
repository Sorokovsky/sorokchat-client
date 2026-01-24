import {CreateQueryResult, injectQuery, queryOptions} from '@tanstack/angular-query-experimental';
import {QueryKeys} from '@/constants/query-keys.constants';
import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';

export function injectProfileQuery(): CreateQueryResult<User, ProblemDetail> {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectQuery(() => queryOptions({
    queryKey: [QueryKeys.PROFILE],
    async queryFn(): Promise<User> {
      return await authorizationService.getProfile();
    },
    retry: false
  }));
}
