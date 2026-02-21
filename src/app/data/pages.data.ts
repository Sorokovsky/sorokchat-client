import { CHATS_PAGE, CONTACTS_PAGE, LOGIN_PAGE, REGISTER_PAGE, SETTINGS_PAGE } from '@/pages';
import { PRIVACY_PAGE } from '@/pages/privacy';
import type { Page } from '@/shared';
import { removeDynamicPath } from '@/shared';

export const ANONYMOUS_PAGES: Page[] = [REGISTER_PAGE, LOGIN_PAGE];
export const ALL_PAGES: Page[] = Array.from(
  new Set([
    CHATS_PAGE,
    { ...CHATS_PAGE, path: removeDynamicPath(CHATS_PAGE.path) },
    SETTINGS_PAGE,
    PRIVACY_PAGE,
    ...ANONYMOUS_PAGES,
    CONTACTS_PAGE,
    { ...CONTACTS_PAGE, path: removeDynamicPath(CHATS_PAGE.path) },
  ]),
);
