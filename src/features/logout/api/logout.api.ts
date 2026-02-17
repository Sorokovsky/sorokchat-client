import { inject } from '@angular/core';

import { AuthorizationService } from '@/entities';
import { injectBaseMutation, LocaleTokenStorage, QueryKeys } from '@/shared';

import type { Logout } from '../models';

export function injectLogout(): Logout {
  const service: AuthorizationService = inject(AuthorizationService);
  const tokenStorage: LocaleTokenStorage = inject(LocaleTokenStorage);
  return injectBaseMutation(
    [QueryKeys.LOGOUT],
    async (): Promise<void> => await service.logout(),
    [QueryKeys.PROFILE],
    (): Promise<void> => tokenStorage.clearToken().then(),
  );
}
