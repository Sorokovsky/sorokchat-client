import {type BaseQuery, injectBaseQuery, QueryKeys} from '@/shared';
import {AuthorizationService} from '@/entity/authorization';
import {inject} from '@angular/core';
import {type User} from '@/entity/user';

export type ProfileQuery = BaseQuery<User>;

export function injectProfileQuery(): ProfileQuery {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseQuery(
    [QueryKeys.PROFILE],
    async (): Promise<User> => authorizationService.getProfile(),
    1
  );
}
