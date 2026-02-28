import type { Signal } from '@angular/core';
import { computed } from '@angular/core';

import type { Page } from '../models';
import { injectCurrentPath } from './current-path';

export function injectCurrentPage(pages: Page[]): Signal<Page | null> {
  const currentPath: Signal<string> = injectCurrentPath();
  return computed<Page | null>((): Page | null => {
    const page: Page | undefined = pages.find(
      (page: Page): boolean => currentPath() === page.fullUrl,
    );
    return page !== undefined ? page : null;
  });
}
