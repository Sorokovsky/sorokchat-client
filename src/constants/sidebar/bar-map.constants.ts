import {type Type} from '@angular/core';
import {removeDynamicRoute} from "@/shared/utils/replace-dynamic-route.util";
import {CHATS_PAGE, FRIENDS_PAGE, SETTINGS_PAGE} from '@/app/routes/pages.constants';
import {ChatsBar} from '@/components/layout/sidebar/chats/chats-bar/chats-bar';
import {FriendsBar} from '@/components/layout/sidebar/friends/friends-bar/friends-bar';
import {SettingsBar} from '@/components/layout/sidebar/settings/settings-bar/settings-bar';

export const SIDEBAR_BAR_MAP: Record<string, Type<unknown>> = {
  [removeDynamicRoute(CHATS_PAGE.path)]: ChatsBar,
  [removeDynamicRoute(FRIENDS_PAGE.path)]: FriendsBar,
  [removeDynamicRoute(SETTINGS_PAGE.path)]: SettingsBar
};
