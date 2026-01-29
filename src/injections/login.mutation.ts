import {User} from '@/contracts/user.contrcact';
import {LoginPayload} from '@/contracts/login-payload';
import {AuthorizationService} from '@/services/authorization.service';
import {inject} from '@angular/core';
import {QueryKeys} from '@/constants/query-keys.constants';
import {BaseMutation, injectBaseMutation} from '@/injections/base-mutation.injection';

export type LoginMutation = BaseMutation<LoginPayload, User>;

export function injectLoginMutation(): LoginMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.LOGIN],
    (payload: LoginPayload): Promise<User> => authorizationService.login(payload),
    [QueryKeys.PROFILE]
  )
}
