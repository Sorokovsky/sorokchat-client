import {computed, type Signal} from '@angular/core';
import {injectProfileQuery, type ProfileQuery} from '@/entity';

export function injectIsAuthenticated(): Signal<boolean> {
  const profile: ProfileQuery = injectProfileQuery();
  return computed((): boolean => profile.data() !== undefined);
}
