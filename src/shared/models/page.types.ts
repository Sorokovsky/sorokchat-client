import type { Route } from '@angular/router';

import type { AccessRule } from './access-rule.types';
import type { IconType } from './icon.types';

export type Page = Route & {
  icon?: IconType;
  accessRule: AccessRule;
};
