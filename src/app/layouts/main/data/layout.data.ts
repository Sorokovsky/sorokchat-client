import type { Type } from '@angular/core';

import { authorizationGuard } from '@/app/guards';
import type { Page } from '@/shared';
import { AccessRule, PagePaths } from '@/shared';

const paths = new PagePaths();

export const MAIN_LAYOUT: Page = {
  path: paths.main,
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((module): Type<unknown> => module.MainLayout),
  children: [],
  accessRule: AccessRule.SECURED,
  fullUrl: paths.mainUrl,
  canActivateChild: [authorizationGuard],
};
