import {hasAccess, type Page} from '@/shared';
import {computed, type Signal} from '@angular/core';
import {injectProfileQuery, type ProfileQuery} from '@/entity';

export function injectGetPageByAccessRule(pages: Page[]): Signal<Page[]> {
  const profile: ProfileQuery = injectProfileQuery();
  return computed((): Page[] => {
    return pages.filter((page: Page): boolean => hasAccess(page, profile.data()));
  });
}
