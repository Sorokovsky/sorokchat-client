import type { Routes } from '@angular/router';

import { CHATS_PAGE } from '@/pages';
import { removeDynamicPath } from '@/shared';

import { ANONYMOUS_PAGES } from '../data';
import { AuthorizationLayout, MainLayout } from '../layouts';
import { SECURED_PAGES } from '@/app/data/pages.data';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: removeDynamicPath(CHATS_PAGE.path),
        pathMatch: 'full',
      },
      ...SECURED_PAGES,
    ],
  },
  {
    path: '',
    component: AuthorizationLayout,
    children: ANONYMOUS_PAGES,
  },
];
