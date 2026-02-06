import {AccessRule, type Page} from '@/types';
import {LoginPage} from '@/components/page/login-page/login-page';
import {RegisterPage} from '@/components/page/register-page/register-page';
import {ChatsPage} from '@/components/page/chats-page/chats-page';
import {HandshakeIcon, MessageSquare, Settings} from 'lucide-angular';
import {SettingsPage} from '@/components/page/settings-page/settings-page';
import {FriendsPage} from '@/components/page/friends-page/friends-page';

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
  path: "chats/:chatId?",
  component: ChatsPage,
  icon: MessageSquare
};

export const SETTINGS_PAGE: Page = {
  title: "Налаштування",
  accessRule: AccessRule.SECURED,
  path: "settings/:settingId?",
  component: SettingsPage,
  icon: Settings
};

export const FRIENDS_PAGE: Page = {
  title: "Друзі",
  accessRule: AccessRule.SECURED,
  path: "friends/:friendId?",
  component: FriendsPage,
  icon: HandshakeIcon
};

export const ALL_PAGES: Page[] = [LOGIN_PAGE, REGISTER_PAGE, CHATS_PAGE, SETTINGS_PAGE, FRIENDS_PAGE];
