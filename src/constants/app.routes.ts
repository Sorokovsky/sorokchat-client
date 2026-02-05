import {type Routes} from '@angular/router';
import {MainLayout} from '@/components/layout/main-layout/main-layout';
import {AuthorizationLayout} from '@/components/layout/authorization-layout/authorization-layout';
import {
  CHAT_PAGE,
  CHATS_PAGE,
  FRIENDS_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  SETTINGS_PAGE
} from '@/constants/pages.constants';

export const routes: Routes = [
  {
    path: '',
    redirectTo: CHATS_PAGE.path,
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    children: [CHAT_PAGE, CHATS_PAGE, SETTINGS_PAGE, FRIENDS_PAGE],
  },
  {
    path: '',
    component: AuthorizationLayout,
    children: [REGISTER_PAGE, LOGIN_PAGE],
  },
];
