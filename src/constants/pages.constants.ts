import {LoginPage} from '@/components/pages/login/login.page';
import {Type} from '@angular/core';
import {LogoutPage} from '@/components/pages/logout/logout.page';

export type Page = {
  title: string;
  path: string;
  component?: Type<unknown>
}

export const LOGIN_PAGE: Page = {
  title: "Вхід",
  path: "login",
  component: LoginPage,
};

export const LOGOUT_PAGE: Page = {
  title: "Вихід",
  path: "logout",
  component: LogoutPage,
};

export const REGISTER_PAGE: Page = {
  title: "Реєстрація",
  path: "register",
};

export const ANONYMOUS_PAGES: Page[] = [REGISTER_PAGE, LOGIN_PAGE];
export const SECURED_PAGES: Page[] = [LOGOUT_PAGE];
