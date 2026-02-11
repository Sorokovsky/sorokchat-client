import { Location } from '@angular/common';
import type { Signal } from '@angular/core';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

export function injectCurrentPath(): Signal<string> {
  const router: Router = inject(Router);
  const location: Location = inject(Location);
  return toSignal(
    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((): string => location.path().replace('/', '')),
    ),
    { initialValue: location.path().replace('/', '') },
  );
}
