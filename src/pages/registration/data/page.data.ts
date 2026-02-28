import type { Type } from '@angular/core';

import type { Page } from '@/shared';
import { AccessRule, PagePaths } from '@/shared';

const paths = new PagePaths();

export const REGISTER_PAGE: Page = {
  title: 'Реєстрація',
  path: paths.register,
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((module): Type<unknown> => module.RegisterPage),
  accessRule: AccessRule.ANONYMOUS,
  fullUrl: paths.registerUrl,
};
