import { CHATS_PAGE, LOGIN_PAGE, REGISTER_PAGE, SETTINGS_PAGE } from '@/pages';
import type { Page } from '@/shared';
import { removeDynamicPath } from '@/shared';

export const ANONYMOUS_PAGES: Page[] = [REGISTER_PAGE, LOGIN_PAGE];
export const SECURED_PAGES: Page[] = [
  CHATS_PAGE,
  { ...CHATS_PAGE, path: removeDynamicPath(CHATS_PAGE.path) },
  SETTINGS_PAGE,
];
export const ALL_PAGES: Page[] = Array.from(new Set([...SECURED_PAGES, ...ANONYMOUS_PAGES]));
