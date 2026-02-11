import type { Type } from '@angular/core';

import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export const REGISTER_PAGE: Page = {
  title: 'Реєстрація',
  path: 'register',
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((result): Type<unknown> => result.RegisterPage),
  accessRule: AccessRule.ANONYMOUS,
};
