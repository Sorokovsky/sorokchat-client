import type { Signal } from '@angular/core';
import { computed } from '@angular/core';

import { injectIsAuthenticated } from '@/entities';
import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export function injectHasAccess(page: Page | null): Signal<boolean> {
  if (page === null) throw new Error('Page cannot be found');
  const isAuthenticated: Signal<boolean> = injectIsAuthenticated();
  return computed((): boolean => {
    switch (page.accessRule) {
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
