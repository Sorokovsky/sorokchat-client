import {Page} from '@/constants/pages.constants';
import {injectProfileQuery} from '@/injections/profile.query';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {hasAccess} from '@/utils/has-access.util';
import {computed, Signal} from '@angular/core';

export function injectGetPageByAccessRule(pages: Page[]): Signal<Page[]> {
  const profile: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();
  return computed(() => {
    return pages.filter(page => hasAccess(page, profile.data()));
  });
}
