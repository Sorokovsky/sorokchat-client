import {inject} from '@angular/core';
import {AuthorizationService} from '@/services/authorization.service';
import {RegisterPayload} from '@/contracts/register-payload.contract';
import {User} from '@/contracts/user.contrcact';
import {QueryKeys} from '@/constants/query-keys.constants';
import {BaseMutation, injectBaseMutation} from '@/injections/base-mutation.injection';

export type RegisterMutation = BaseMutation<RegisterPayload, User>;

export function injectRegisterMutation(): RegisterMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.REGISTER],
    async (payload: RegisterPayload): Promise<User> => await authorizationService.register(payload),
    [QueryKeys.PROFILE]
  );
}
