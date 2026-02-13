import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import {
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { INTERCEPTORS } from '@/shared';

import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideTanStackQuery(new QueryClient()),
    provideHttpClient(withInterceptors(INTERCEPTORS)),
    {
      provide: LOCALE_ID,
      useValue: 'uk-UA',
    },
  ],
};
