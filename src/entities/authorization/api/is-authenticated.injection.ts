import type { Signal } from '@angular/core';
import { computed } from '@angular/core';

import type { GetProfileQuery } from '../models';
import { injectGetProfile } from './get-profile.injection';

export function injectIsAuthenticated(): Signal<boolean> {
  const profile: GetProfileQuery = injectGetProfile();
  return computed((): boolean => {
    return !!profile.data();
  });
}
