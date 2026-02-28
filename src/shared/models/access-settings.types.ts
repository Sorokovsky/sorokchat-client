import type { AccessRule } from './access-rule.types';
import type { Page } from './page.types';

export interface AccessSetting {
  defaultPage: Page;
  accessRule: AccessRule;
}
