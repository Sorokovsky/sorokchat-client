import {inject, type Signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';

export function injectCurrentPath(): Signal<string> {
  const router: Router = inject(Router);
  return toSignal(
    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((): string => router.url)
    ),
    {initialValue: router.url}
  );
}
