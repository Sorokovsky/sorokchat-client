import {type Routes} from '@angular/router';
import {MainLayout} from '@/components/layout/main-layout/main-layout';
import {AuthorizationLayout} from '@/components/layout/authorization-layout/authorization-layout';
import {CHATS_PAGE, FRIENDS_PAGE, LOGIN_PAGE, REGISTER_PAGE, SETTINGS_PAGE} from '@/constants/routing/pages.constants';
import {removeDynamicRoute} from '@/utils/replace-dynamic-route.util';

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
