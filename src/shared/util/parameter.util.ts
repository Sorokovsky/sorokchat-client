import type { Signal } from '@angular/core';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Params } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';

function getDefaultParameter(route: ActivatedRoute, parameterName: string): string | null {
  const parameters: Params = route.snapshot.params;
  return parameters[parameterName] || null;
}

export function injectParameter(parameterName: string): Signal<string | null> {
  const route: ActivatedRoute = inject(ActivatedRoute);
  const router: Router = inject(Router);
  const parameters: Signal<Params | undefined> = toSignal(route.params);
  return toSignal(
    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((): string | null => {
        const parametersMap: Params | undefined = parameters();
        if (parametersMap === undefined) return null;
        return parametersMap[parameterName] || null;
      }),
    ),
    { initialValue: getDefaultParameter(route, parameterName) },
  );
}
