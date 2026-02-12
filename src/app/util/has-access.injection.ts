import type { Signal } from '@angular/core';
import { computed } from '@angular/core';

import { injectIsAuthenticated } from '@/entities';
import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export function injectHasAccess(page: Signal<Page | null>): Signal<boolean> {
  const isAuthenticated: Signal<boolean> = injectIsAuthenticated();
  return computed((): boolean => {
    const currentPage: Page | null = page();
    if (currentPage === null) throw new Error('Page cannot be found');
    switch (currentPage.accessRule) {
      case AccessRule.PERMIT_ALL:
        return true;
      case AccessRule.DENY_ALL:
        return false;
      case AccessRule.SECURED:
        return isAuthenticated();
      case AccessRule.ANONYMOUS:
        return !isAuthenticated();
    }
  });
}
