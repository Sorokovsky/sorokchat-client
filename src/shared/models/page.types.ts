import type { Type } from '@angular/core';

import type { AccessRule } from './access-rule.schema';
import type { IconType } from './icon.types';

export interface Page {
  title?: string;
  path: string;
  icon?: IconType;
  component?: Type<unknown>;
  loadComponent?: () => Promise<Type<unknown>>;
  accessRule: AccessRule;
}
