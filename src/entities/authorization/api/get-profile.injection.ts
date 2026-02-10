import { inject } from '@angular/core';

import { QueryKeys } from '@/shared';
import { injectBaseQuery } from '@/shared/api';

import type { User } from '../../user/@x/authorization';
import { RETRY } from '../data';
import type { GetProfileQuery } from '../models';
import { AuthorizationService } from './authorization.service';

export function injectGetProfile(): GetProfileQuery {
  const authorizationService: AuthorizationService = inject(AuthorizationService);
  return injectBaseQuery<User>(
    [QueryKeys.PROFILE],
    async (): Promise<User> => await authorizationService.getProfile(),
    RETRY,
  );
}
