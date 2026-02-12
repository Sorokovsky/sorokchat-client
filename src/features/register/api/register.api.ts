import { inject } from '@angular/core';

import type { RegisterPayload, User } from '@/entities';
import { AuthorizationService } from '@/entities';
import { injectBaseMutation, QueryKeys } from '@/shared';

import type { RegisterMutation } from '../models';

export function injectRegister(): RegisterMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.REGISTER],
    async (payload: RegisterPayload): Promise<User> => await authorizationService.register(payload),
    [QueryKeys.PROFILE],
  );
}
