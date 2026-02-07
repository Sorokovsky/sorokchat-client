import {type AccessRule} from '@/shared/models/access-rule.type';
import {type Page} from '@/shared/models/page.type';

export type AccessSettings = {
  accessRule: AccessRule,
  defaultPage: Page,
}
