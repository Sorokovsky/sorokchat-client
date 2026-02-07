import {type AccessRule, type AccessSettings, type Page} from '@/shared';
import {ACCESS_SETTINGS} from '@/shared/config';

export function getDefaultPageByAccess(accessRule: AccessRule, settings: AccessSettings[] = ACCESS_SETTINGS): Page {
  const page: Page | undefined = settings
    .find((setting: AccessSettings): boolean => setting.accessRule === accessRule)?.defaultPage;
  if (page === undefined) throw new Error('No access settings found.');
  return page;
}
