import type { Route } from '@angular/router';

import type { AccessRule } from './access-rule.types';

export type Page = Route & {
  accessRule: AccessRule;
  fullUrl: string;
};
