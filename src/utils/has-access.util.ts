import {AccessRule, type Page} from '@/constants/pages.constants';
import {type User} from '@/contracts/user.contrcact';

export function hasAccess(page: Page, user: User | undefined): boolean {
  const isAuthenticated: boolean = user !== undefined;
  switch (page.accessRule) {
    case AccessRule.PERMIT_ALL:
      return true;
    case AccessRule.DENY_ALL:
      return false;
    case AccessRule.SECURED:
      return isAuthenticated;
    case AccessRule.ANONYMOUS:
      return !isAuthenticated;
  }
}
