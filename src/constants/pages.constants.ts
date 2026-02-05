import {AccessRule, type Page} from '@/types';
import {LoginPage} from '@/components/page/login-page/login-page';
import {RegisterPage} from '@/components/page/register-page/register-page';
import {ChatsPage} from '@/components/page/chats-page/chats-page';

export const REGISTER_PAGE: Page = {
  title: "Реєстрація",
  accessRule: AccessRule.ANONYMOUS,
  path: "register",
  component: RegisterPage
};

export const LOGIN_PAGE: Page = {
  title: "Вхід",
  accessRule: AccessRule.ANONYMOUS,
  path: "login",
  component: LoginPage
};

export const CHATS_PAGE: Page = {
  title: "Чати",
  accessRule: AccessRule.SECURED,
  path: "chats",
  component: ChatsPage
}

export const CHAT_PAGE: Page = {
  ...CHATS_PAGE,
  path: `${CHATS_PAGE.path}/:chatId`
};

export const ALL_PAGES: Page[] = [LOGIN_PAGE, REGISTER_PAGE, CHATS_PAGE, CHAT_PAGE];
