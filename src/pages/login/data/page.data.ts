import type { Type } from '@angular/core';

import type { Page } from '@/shared';
import { AccessRule, PagePaths } from '@/shared';

const paths = new PagePaths();

export const LOGIN_PAGE: Page = {
  title: 'Вхід',
  path: paths.login,
  accessRule: AccessRule.ANONYMOUS,
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((module): Type<unknown> => module.LoginPage),
};
