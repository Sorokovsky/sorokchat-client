import type { Signal } from '@angular/core';
import { computed, inject } from '@angular/core';
import type { UrlTree } from '@angular/router';
import { Router } from '@angular/router';

import type { AccessSetting, Page } from '@/shared';
import { AccessRule, injectCurrentPage } from '@/shared';

import { injectIsAuthenticated } from '../api';
import { PAGES } from '../data';
import { ACCESS_SETTINGS } from '../data/access-settings.data';

export function injectCanActivate(): Signal<boolean | UrlTree> {
  const router: Router = inject(Router);
  const isAuthenticated: Signal<boolean> = injectIsAuthenticated();
  const currentPage: Signal<Page | null> = injectCurrentPage(PAGES);
  return computed<boolean | UrlTree>((): boolean | UrlTree => {
    const authenticated: boolean = isAuthenticated();
    const page: Page | null = currentPage();
    if (page === null) return true;
    if (page.accessRule === AccessRule.PERMIT_ALL) return true;
    if (page.accessRule === AccessRule.DENY_ALL) return router.createUrlTree(['/']);
    if (
      (authenticated && page.accessRule !== AccessRule.SECURED) ||
      (!authenticated && page.accessRule !== AccessRule.ANONYMOUS)
    ) {
      const accessSetting: AccessSetting | undefined = ACCESS_SETTINGS.find(
        (setting: AccessSetting): boolean => setting.accessRule === page.accessRule,
      );

      if (accessSetting === undefined) return router.createUrlTree(['/']);
      return router.createUrlTree([accessSetting.defaultPage.fullUrl]);
    }
    return true;
  });
}
