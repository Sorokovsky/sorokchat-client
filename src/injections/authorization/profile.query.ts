import {QueryKeys} from '@/shared/models/query-keys.constants';
import {AuthorizationService} from '@/entity/authorization/api/authorization.service';
import {inject} from '@angular/core';
import {type User} from '@/contracts/user/user.contrcact';
import {type BaseQuery, injectBaseQuery} from '@/shared/api/base-query.injection';

export type ProfileQuery = BaseQuery<User>;

export function injectProfileQuery(): ProfileQuery {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseQuery(
    [QueryKeys.PROFILE],
    async (): Promise<User> => authorizationService.getProfile(),
    1
  );
}
