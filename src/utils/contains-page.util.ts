import {type Page} from '@/constants/pages.constants';

export function isContainsPage(pages: Page[], path: string): boolean {
  return pages.some((page: Page): boolean => page.path === path);
}
