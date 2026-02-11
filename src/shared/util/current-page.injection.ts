import type { Signal } from '@angular/core';
import { computed } from '@angular/core';

import type { Page } from '../models';
import { injectCurrentPath } from './current-path.injection';

export function injectCurrentPage(pages: Page[]): Signal<Page | null> {
  const currentPath: Signal<string> = injectCurrentPath();
  return computed(
    (): Page | null =>
      pages.find((page: Page): boolean => page.path.includes(currentPath())) || null,
  );
}
