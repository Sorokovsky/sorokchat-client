import {type User} from '@/contracts/user/user.contrcact';
import {type LoginPayload} from '@/contracts/authorization/login-payload';
import {AuthorizationService} from '@/entity/authorization/api/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/external/query-keys.constants';
import {type BaseMutation, injectBaseMutation} from '@/shared/api/base-mutation.injection';

export type LoginMutation = BaseMutation<LoginPayload, User>;

export function injectLoginMutation(): LoginMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.LOGIN],
    (payload: LoginPayload): Promise<User> => authorizationService.login(payload),
    [QueryKeys.PROFILE]
  )
}
