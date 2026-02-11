import type { Type } from '@angular/core';

import type { AccessRule } from './access-rule.schema';

export interface Page {
  title?: string;
  path: string;
  icon?: string;
  component?: Type<unknown>;
  loadComponent?: () => Promise<Type<unknown>>;
  accessRule: AccessRule;
}
