import type { Routes } from '@angular/router';

import { CHATS_PAGE, PRIVACY_PAGE, SETTINGS_PAGE } from '@/pages';
import { removeDynamicPath } from '@/shared';

import { ANONYMOUS_PAGES } from '../data';
import { AuthorizationLayout, MainLayout } from '../layouts';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/' + removeDynamicPath(CHATS_PAGE.path),
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      CHATS_PAGE,
      { ...CHATS_PAGE, path: removeDynamicPath(CHATS_PAGE.path) },
      { ...SETTINGS_PAGE, children: [PRIVACY_PAGE] },
    ],
  },
  {
    path: '',
    component: AuthorizationLayout,
    children: ANONYMOUS_PAGES,
  },
];
