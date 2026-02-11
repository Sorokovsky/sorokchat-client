import { REGISTER_PAGE } from '@/pages';
import type { AccessSetting } from '@/shared';
import { AccessRule } from '@/shared';

const SECURED_SETTING: AccessSetting = {
  accessRule: AccessRule.SECURED,
  defaultPage: REGISTER_PAGE,
};

export const ALL_ACCESS_SETTINGS: AccessSetting[] = [SECURED_SETTING];
