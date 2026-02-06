import {type Type} from '@angular/core';
import {removeDynamicRoute} from "@/utils/replace-dynamic-route.util";
import {CHATS_PAGE, FRIENDS_PAGE, SETTINGS_PAGE} from '@/constants/pages.constants';
import {ChatsBar} from '@/components/common/chats-bar/chats-bar';
import {FriendsBar} from '@/components/common/friends-bar/friends-bar';
import {SettingsBar} from '@/components/common/settings-bar/settings-bar';

export const SIDEBAR_BAR_MAP: Record<string, Type<unknown>> = {
  [removeDynamicRoute(CHATS_PAGE.path)]: ChatsBar,
  [removeDynamicRoute(FRIENDS_PAGE.path)]: FriendsBar,
  [removeDynamicRoute(SETTINGS_PAGE.path)]: SettingsBar
};
