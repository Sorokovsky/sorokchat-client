import type { Type } from '@angular/core';

import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export const REGISTER_PAGE: Page = {
  title: 'Реєстрація',
  path: 'registration',
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((module): Type<unknown> => module.RegisterPage),
  accessRule: AccessRule.ANONYMOUS,
};
