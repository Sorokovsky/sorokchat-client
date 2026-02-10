import type { Routes } from '@angular/router';

import { ANONYMOUS_PAGES } from '@/app/config';

import { AuthorizationLayout, MainLayout } from '../layouts';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
  },
  {
    path: '',
    component: AuthorizationLayout,
    children: ANONYMOUS_PAGES,
  },
];
