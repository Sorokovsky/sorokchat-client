import { CHATS_PAGE, REGISTER_PAGE } from '@/pages';
import type { AccessSetting } from '@/shared';
import { AccessRule } from '@/shared';

const SECURED_SETTING: AccessSetting = {
  accessRule: AccessRule.SECURED,
  defaultPage: REGISTER_PAGE,
};

const ANONYMOUS_SETTING: AccessSetting = {
  accessRule: AccessRule.ANONYMOUS,
  defaultPage: CHATS_PAGE,
};

export const ALL_ACCESS_SETTINGS: AccessSetting[] = [SECURED_SETTING, ANONYMOUS_SETTING];
