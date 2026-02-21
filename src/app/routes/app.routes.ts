import type { Type } from '@angular/core';
import type { Routes } from '@angular/router';

import { CHATS_PAGE, CONTACTS_PAGE, PRIVACY_PAGE, SETTINGS_PAGE } from '@/pages';
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
      CONTACTS_PAGE,
      { ...CONTACTS_PAGE, path: removeDynamicPath(CONTACTS_PAGE.path) },
      {
        ...SETTINGS_PAGE,
        children: [
          {
            ...SETTINGS_PAGE,
            path: '',
            pathMatch: 'full',
            loadComponent: (): Promise<Type<unknown>> =>
              import('@/entities').then((result): Type<unknown> => result.NoSettings),
          },
          PRIVACY_PAGE,
        ],
      },
    ],
  },
  {
    path: '',
    component: AuthorizationLayout,
    children: ANONYMOUS_PAGES,
  },
];
