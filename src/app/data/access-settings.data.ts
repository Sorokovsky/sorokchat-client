import { LOGIN_PAGE } from '@/pages';
import type { AccessSetting } from '@/shared';
import { AccessRule } from '@/shared';

export const ACCESS_SETTINGS: AccessSetting[] = [
  {
    accessRule: AccessRule.SECURED,
    defaultPage: LOGIN_PAGE,
  },
];
