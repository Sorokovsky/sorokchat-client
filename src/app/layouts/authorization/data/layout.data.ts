import type { Type } from '@angular/core';

import { REGISTER_PAGE } from '@/pages';
import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export const AUTHORIZATION_LAYOUT: Page = {
  title: 'Авторизація',
  path: 'authorization',
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((module): Type<unknown> => module.AuthorizationLayout),
  children: [REGISTER_PAGE],
  accessRule: AccessRule.ANONYMOUS,
};
