import type { Type } from '@angular/core';

import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export const LOGIN_PAGE: Page = {
  title: 'Вхід',
  accessRule: AccessRule.ANONYMOUS,
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((result): Type<unknown> => result.LoginPage),
  path: 'login',
};
