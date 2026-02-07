import {type AccessRule} from '@/app/models/access-rule.type';
import {type Page} from '@/app/models/page.type';

export type AccessSettings = {
  accessRule: AccessRule,
  defaultPage: Page,
}
