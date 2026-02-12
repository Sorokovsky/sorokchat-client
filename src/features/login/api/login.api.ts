import { inject } from '@angular/core';

import type { LoginPayload, User } from '@/entities';
import { AuthorizationService } from '@/entities';
import { injectBaseMutation, QueryKeys } from '@/shared';

import type { LoginMutation } from '../models';

export function injectLogin(): LoginMutation {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.LOGIN],
    async (payload: LoginPayload): Promise<User> => await authorizationService.login(payload),
    [QueryKeys.PROFILE],
  );
}
