import type { Type } from '@angular/core';
import { SettingsIcon } from 'lucide-angular';

import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export const SETTINGS_PAGE: Page = {
  path: 'settings',
  icon: SettingsIcon,
  accessRule: AccessRule.SECURED,
  title: 'Налаштування',
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((result): Type<unknown> => result.SettingsPage),
};
