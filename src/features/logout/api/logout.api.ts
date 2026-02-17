import { inject } from '@angular/core';

import { AuthorizationService } from '@/entities';
import { injectBaseMutation, QueryKeys } from '@/shared';

import type { Logout } from '../models';

export function injectLogout(): Logout {
  const service: AuthorizationService = inject(AuthorizationService);
  return injectBaseMutation([QueryKeys.LOGOUT], async (): Promise<void> => await service.logout(), [
    QueryKeys.PROFILE,
  ]);
}
