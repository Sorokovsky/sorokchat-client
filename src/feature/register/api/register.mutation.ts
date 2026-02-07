import {inject} from '@angular/core';
import {AuthorizationService} from '@/entity/authorization/api/authorization.service';
import {type RegisterPayload} from '@/feature/register/model/register-payload.contract';
import {type User} from '@/entity/user/model/user.contrcact';
import {QueryKeys} from '@/shared/models/query-keys.constants';
import {type BaseMutation, injectBaseMutation} from '@/shared/api/base-mutation.injection';

export type RegisterMutation = BaseMutation<RegisterPayload, User>;

export function injectRegisterMutation(): RegisterMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.REGISTER],
    async (payload: RegisterPayload): Promise<User> => await authorizationService.register(payload),
    [QueryKeys.PROFILE]
  );
}
