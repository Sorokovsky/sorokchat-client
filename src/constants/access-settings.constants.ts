import {AccessRule, type AccessSettings} from '@/types';
import {CHATS_PAGE, LOGIN_PAGE} from '@/constants/pages.constants';

const SECURED_SETTING: AccessSettings = {
  accessRule: AccessRule.SECURED,
  defaultPage: LOGIN_PAGE
};

const ANONYMOUS_SETTING: AccessSettings = {
  accessRule: AccessRule.ANONYMOUS,
  defaultPage: CHATS_PAGE
};

export const ACCESS_SETTINGS: AccessSettings[] = [SECURED_SETTING, ANONYMOUS_SETTING];
