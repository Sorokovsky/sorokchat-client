import { ChatsBar } from '@/entities';
import { CHATS_PAGE, SETTINGS_PAGE } from '@/pages';
import type { Mappings, Page } from '@/shared';
import { removeDynamicPath } from '@/shared';

export const TOP_LEFT_MENU: Page[] = [CHATS_PAGE];
export const BOTTOM_LEFT_MENU: Page[] = [SETTINGS_PAGE];
export const MAPPINGS: Mappings = {
  [removeDynamicPath(CHATS_PAGE.path)]: ChatsBar,
};
