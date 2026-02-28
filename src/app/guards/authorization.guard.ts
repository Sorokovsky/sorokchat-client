import { toObservable } from '@angular/core/rxjs-interop';
import type { CanActivateChildFn, GuardResult, MaybeAsync } from '@angular/router';

import { injectCanActivate } from '../utils/can-activate';

export const authorizationGuard: CanActivateChildFn = (): MaybeAsync<GuardResult> => {
  const canActivate = injectCanActivate();
  return toObservable(canActivate);
};
