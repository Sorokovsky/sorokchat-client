import {type AccessRule} from '@/types/access-rule.type';
import {type Page} from '@/types/page.type';

export type AccessSettings = {
  accessRule: AccessRule,
  defaultPage: Page,
}
