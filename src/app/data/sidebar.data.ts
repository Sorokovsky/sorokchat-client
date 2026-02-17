import { CHATS_PAGE, SETTINGS_PAGE } from '@/pages';
import type { Mappings, Page } from '@/shared';
import { removeDynamicPath } from '@/shared';
import { ChatsBar, SettingsBar } from '@/widgets';

export const TOP_LEFT_MENU: Page[] = [CHATS_PAGE];
export const BOTTOM_LEFT_MENU: Page[] = [SETTINGS_PAGE];
export const MAPPINGS: Mappings = {
  [removeDynamicPath(CHATS_PAGE.path)]: ChatsBar,
  [removeDynamicPath(SETTINGS_PAGE.path)]: SettingsBar,
};
