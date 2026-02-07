import {AuthorizationService} from '@/entity';
import {inject} from '@angular/core';
import {type BaseMutation, injectBaseMutation, QueryKeys} from '@/shared';

export type LogoutMutation = BaseMutation<void, void>;

export function injectLogoutMutation(): LogoutMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation<void, void>(
    [QueryKeys.LOGOUT],
    async (): Promise<void> => await authorizationService.logout(),
    [QueryKeys.PROFILE],
  );
}
