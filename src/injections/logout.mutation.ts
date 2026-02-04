import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/query-keys.constants';
import {type BaseMutation, injectBaseMutation} from '@/injections/base-mutation.injection';

export type LogoutMutation = BaseMutation<void, void>;

export function injectLogoutMutation(): LogoutMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation<void, void>(
    [QueryKeys.LOGOUT],
    async (): Promise<void> => await authorizationService.logout(),
    [QueryKeys.PROFILE],
  );
}
