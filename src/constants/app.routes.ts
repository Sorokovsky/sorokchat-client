import {Routes} from '@angular/router';
import {CHAT_PAGE, LOGIN_PAGE, LOGOUT_PAGE, NON_CHAT_PAGE, REGISTER_PAGE} from '@/constants/pages.constants';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${NON_CHAT_PAGE.path}`,
    pathMatch: 'full'
  },
  LOGIN_PAGE,
  LOGOUT_PAGE,
  REGISTER_PAGE,
  NON_CHAT_PAGE,
  CHAT_PAGE,
];
