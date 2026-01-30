import {Routes} from '@angular/router';
import {CHAT_PAGE, LOGIN_PAGE, LOGOUT_PAGE, REGISTER_PAGE} from '@/constants/pages.constants';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${CHAT_PAGE.path}`,
    pathMatch: 'full'
  },
  LOGIN_PAGE,
  LOGOUT_PAGE,
  REGISTER_PAGE,
  CHAT_PAGE,
  {
    ...CHAT_PAGE,
    path: `${CHAT_PAGE.path}/:chatId`
  }
];
