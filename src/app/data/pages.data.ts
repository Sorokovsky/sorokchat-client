import {CHATS_PAGE, REGISTER_PAGE} from "@/pages";
import {LOGIN_PAGE} from "@/pages/login/data/page.data";
import type {Page} from "@/shared";
import {removeDynamicPath} from "@/shared";

export const ANONYMOUS_PAGES: Page[] = [REGISTER_PAGE, LOGIN_PAGE];
export const SECURED_PAGES: Page[] = [
  CHATS_PAGE,
  { ...CHATS_PAGE, path: removeDynamicPath(CHATS_PAGE.path) },
];
export const ALL_PAGES: Page[] = Array.from(new Set([...SECURED_PAGES, ...ANONYMOUS_PAGES]));
