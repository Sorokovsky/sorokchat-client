import {AuthorizationService} from '@/entity/authorization/api/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/shared/models/query-keys.constants';
import {type BaseMutation, injectBaseMutation} from '@/shared/api/base-mutation.injection';

export type LogoutMutation = BaseMutation<void, void>;

export function injectLogoutMutation(): LogoutMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation<void, void>(
    [QueryKeys.LOGOUT],
    async (): Promise<void> => await authorizationService.logout(),
    [QueryKeys.PROFILE],
  );
}
