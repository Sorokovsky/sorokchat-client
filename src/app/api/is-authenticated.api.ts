import type { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, filter, map } from 'rxjs';

import type { Profile } from '@/entities';
import { injectProfile } from '@/entities';

export function injectIsAuthenticated(): Signal<boolean> {
  const profile: Profile = injectProfile();
  return toSignal(
    combineLatest([toObservable(profile.data), toObservable(profile.isLoading)]).pipe(
      filter(([, isLoading]): boolean => isLoading),
      map(([user]): boolean => !!user),
    ),
    { initialValue: false },
  );
}
