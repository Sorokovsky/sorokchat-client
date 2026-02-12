import type { EffectRef, Signal } from '@angular/core';
import { effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import type { AccessSetting, Page } from '@/shared';
import { injectCurrentPage, removeDynamicPath } from '@/shared';

import { ALL_ACCESS_SETTINGS, ALL_PAGES } from '../data';
import { injectHasAccess } from '../util';

export function injectAuthenticationGuard(): EffectRef {
  const currentPage: Signal<Page | null> = injectCurrentPage(ALL_PAGES);
  const hasAccess: Signal<boolean> = injectHasAccess(currentPage);
  const router: Router = inject(Router);
  return effect((): void => {
    if (hasAccess()) return;
    const page: Page | null = currentPage();
    if (!page) throw new Error('Page not found');
    const accessSetting: AccessSetting | null =
      ALL_ACCESS_SETTINGS.find(
        (setting: AccessSetting): boolean => setting.accessRule === page.accessRule,
      ) || null;
    if (!accessSetting) throw new Error('Access setting not found');
    router.navigateByUrl(`/${removeDynamicPath(accessSetting.defaultPage.path)}`);
  });
}
