import {AccessRule, type Page} from "@/shared/models";
import {type User} from '@/entity/user/model/user.contrcact';

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
