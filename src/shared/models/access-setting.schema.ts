import type { Page } from '@/shared';

import type { AccessRule } from './access-rule.schema';

export interface AccessSetting {
  accessRule: AccessRule;
  defaultPage: Page;
}
