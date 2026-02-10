import type { Type } from '@angular/core';

import type { Page } from '@/shared';

export const REGISTER_PAGE: Page = {
  title: 'Реєстрація',
  path: 'register',
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((result) => result.RegisterPage),
};
