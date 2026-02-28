import { inject } from '@angular/core';

import type { LoginPayload } from '@/entities';
import { AuthorizationService } from '@/entities';
import { injectBaseMutation, QueryKeys } from '@/shared';

import type { Login } from '../models';

export function injectLogin(): Login {
  const service: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.LOGIN],
    async (payload: LoginPayload): Promise<void> => await service.login(payload),
    [QueryKeys.PROFILE],
  );
}
