import { inject } from '@angular/core';

import { injectBaseQuery, QueryKeys } from '@/shared';

import type { UserPayload } from '../../user/@x/authorization';
import { AuthorizationService } from '../api';
import type { Profile } from '../models';

export function injectProfile(): Profile {
  const service: AuthorizationService = inject(AuthorizationService);
  return injectBaseQuery(
    [QueryKeys.PROFILE],
    async (): Promise<UserPayload> => await service.profile(),
  );
}
