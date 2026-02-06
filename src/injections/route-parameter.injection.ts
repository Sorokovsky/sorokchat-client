import {inject, type Signal} from '@angular/core';
import {ActivatedRoute, type Params} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

export function injectRouteParameter(parameterName: string): Signal<string | null> {
  const activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  return toSignal(
    activatedRoute.params.pipe(map((parameters: Params): string | null => parameters[parameterName] ?? null)),
    {initialValue: null}
  );
}
