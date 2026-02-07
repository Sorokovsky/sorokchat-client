import {hasAccess, type Page} from '@/shared';
import {injectProfileQuery, type ProfileQuery} from '@/entity/chat/api/profile.query';
import {computed, type Signal} from '@angular/core';

export function injectGetPageByAccessRule(pages: Page[]): Signal<Page[]> {
  const profile: ProfileQuery = injectProfileQuery();
  return computed((): Page[] => {
    return pages.filter((page: Page): boolean => hasAccess(page, profile.data()));
  });
}
