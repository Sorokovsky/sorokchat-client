import {Page} from '@/constants/pages.constants';
import {injectProfileQuery, ProfileQuery} from '@/injections/profile.query';
import {hasAccess} from '@/utils/has-access.util';
import {computed, Signal} from '@angular/core';

export function injectGetPageByAccessRule(pages: Page[]): Signal<Page[]> {
  const profile: ProfileQuery = injectProfileQuery();
  return computed((): Page[] => {
    return pages.filter((page: Page): boolean => hasAccess(page, profile.data()));
  });
}
