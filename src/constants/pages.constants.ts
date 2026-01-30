import {LoginPage} from '@/components/pages/login/login.page';
import {Type} from '@angular/core';
import {LogoutPage} from '@/components/pages/logout/logout.page';
import {RegisterPage} from '@/components/pages/register/register.page';
import {ChatPage} from '@/components/pages/chat/chat.page';

export const AccessRule = {
  SECURED: "SECURED",
  ANONYMOUS: "ANONYMOUS",
  PERMIT_ALL: "PERMIT_ALL",
  DENY_ALL: "DENY_ALL",
} as const;
export type AccessRule = typeof AccessRule[keyof typeof AccessRule];

export type Page = {
  title: string;
  path: string;
  component?: Type<unknown>;
  accessRule: AccessRule;
};

export const REGISTER_PAGE: Page = {
  title: "Реєстрація",
  path: "register",
  accessRule: AccessRule.ANONYMOUS,
  component: RegisterPage
};

export const LOGIN_PAGE: Page = {
  title: "Вхід",
  path: "login",
  component: LoginPage,
  accessRule: AccessRule.ANONYMOUS
};

export const LOGOUT_PAGE: Page = {
  title: "Вихід",
  path: "logout",
  component: LogoutPage,
  accessRule: AccessRule.SECURED
};

export const CHAT_PAGE: Page = {
  title: "Чат",
  path: "chat",
  component: ChatPage,
  accessRule: AccessRule.SECURED
}

export const HEADER_PAGES: Page[] = [REGISTER_PAGE, LOGIN_PAGE, LOGOUT_PAGE];
export const ALL_PAGES: Page[] = Array.from(new Set([...HEADER_PAGES, CHAT_PAGE]));
