import type { Type } from '@angular/core';

import { LOGIN_PAGE, REGISTER_PAGE } from '@/pages';
import type { Page } from '@/shared';
import { AccessRule, PagePaths } from '@/shared';

const paths = new PagePaths();

export const AUTHORIZATION_LAYOUT: Page = {
  title: 'Авторизація',
  path: paths.authorization,
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((module): Type<unknown> => module.AuthorizationLayout),
  children: [REGISTER_PAGE, LOGIN_PAGE],
  accessRule: AccessRule.ANONYMOUS,
};
