import type { Type } from '@angular/core';

export interface Page {
  title?: string;
  path: string;
  icon?: string;
  component?: Type<unknown>;
  loadComponent?: () => Promise<Type<unknown>>;
}
