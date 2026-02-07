import {AuthorizationService, type LoginPayload, type User} from '@/entity';
import {inject} from '@angular/core';
import {type BaseMutation, injectBaseMutation, QueryKeys} from '@/shared';

export type LoginMutation = BaseMutation<LoginPayload, User>;

export function injectLoginMutation(): LoginMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.LOGIN],
    (payload: LoginPayload): Promise<User> => authorizationService.login(payload),
    [QueryKeys.PROFILE]
  )
}
