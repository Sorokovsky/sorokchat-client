import {type Routes} from '@angular/router';
import {AuthorizationLayout, MainLayout} from '@/app/layout';
import {CHATS_PAGE, FRIENDS_PAGE, LOGIN_PAGE, REGISTER_PAGE, SETTINGS_PAGE} from '@/app/routes';
import {removeDynamicRoute} from '@/shared';

export const routes: Routes = [
  {
    path: '',
    redirectTo: removeDynamicRoute(CHATS_PAGE.path),
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      CHATS_PAGE,
      {...CHATS_PAGE, path: removeDynamicRoute(CHATS_PAGE.path)},
      SETTINGS_PAGE,
      {...SETTINGS_PAGE, path: removeDynamicRoute(SETTINGS_PAGE.path)},
      FRIENDS_PAGE,
      {...FRIENDS_PAGE, path: removeDynamicRoute(FRIENDS_PAGE.path)}
    ],
  },
  {
    path: '',
    component: AuthorizationLayout,
    children: [REGISTER_PAGE, LOGIN_PAGE],
  },
];
