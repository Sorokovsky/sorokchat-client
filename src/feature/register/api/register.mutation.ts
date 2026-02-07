import {inject} from '@angular/core';
import {AuthorizationService, type RegisterPayload, type User} from '@/entity';
import {type BaseMutation, injectBaseMutation, QueryKeys} from '@/shared';

export type RegisterMutation = BaseMutation<RegisterPayload, User>;

export function injectRegisterMutation(): RegisterMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.REGISTER],
    async (payload: RegisterPayload): Promise<User> => await authorizationService.register(payload),
    [QueryKeys.PROFILE]
  );
}
