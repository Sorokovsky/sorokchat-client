import { inject } from '@angular/core';

import type { RegisterPayload } from '@/entities';
import { AuthorizationService } from '@/entities';
import { injectBaseMutation, QueryKeys } from '@/shared';

import type { Register } from '../models';

export function injectRegister(): Register {
  const service: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation(
    [QueryKeys.REGISTER],
    async (payload: RegisterPayload): Promise<void> => await service.register(payload),
    [QueryKeys.PROFILE],
  );
}
