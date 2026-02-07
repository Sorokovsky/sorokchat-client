import {AuthorizationService} from '@/services/authorization/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/external/query-keys.constants';
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
