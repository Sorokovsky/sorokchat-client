import type { Type } from '@angular/core';
import { UserRoundKeyIcon } from 'lucide-angular';

import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export const PRIVACY_PAGE: Page = {
  path: 'privacy',
  accessRule: AccessRule.SECURED,
  title: 'Конфідеційність',
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((result): Type<unknown> => result.PrivacyPage),
  icon: UserRoundKeyIcon,
};
