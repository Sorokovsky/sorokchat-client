import {AccessRule, type AccessSettings} from '@/types';
import {CHATS_PAGE, LOGIN_PAGE} from '@/app/routes/pages.constants';
import {removeDynamicRoute} from '@/shared/utils/replace-dynamic-route.util';

const SECURED_SETTING: AccessSettings = {
  accessRule: AccessRule.SECURED,
  defaultPage: LOGIN_PAGE
};

const ANONYMOUS_SETTING: AccessSettings = {
  accessRule: AccessRule.ANONYMOUS,
  defaultPage: {...CHATS_PAGE, path: removeDynamicRoute(CHATS_PAGE.path)}
};

export const ACCESS_SETTINGS: AccessSettings[] = [SECURED_SETTING, ANONYMOUS_SETTING];
