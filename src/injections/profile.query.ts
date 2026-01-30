import {QueryKeys} from '@/constants/query-keys.constants';
import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {User} from '@/contracts/user.contrcact';
import {BaseQuery, injectBaseQuery} from '@/injections/base-query.injection';

export type ProfileQuery = BaseQuery<User>;

export function injectProfileQuery(): ProfileQuery {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseQuery(
    [QueryKeys.PROFILE],
    async (): Promise<User> => authorizationService.getProfile(),
    1
  );
}
