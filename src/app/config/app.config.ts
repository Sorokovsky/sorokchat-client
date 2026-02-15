import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import {
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

import {
  AesService,
  ENCRYPTION_SERVICE_KEY,
  HmacService,
  INTERCEPTORS,
  SIGNING_SERVICE_KEY,
} from '@/shared';

import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retryOnMount: false,
          },
        },
      }),
    ),
    provideHttpClient(withInterceptors(INTERCEPTORS)),
    {
      provide: LOCALE_ID,
      useValue: 'uk-UA',
    },
    {
      provide: SIGNING_SERVICE_KEY,
      useClass: HmacService,
    },
    {
      provide: ENCRYPTION_SERVICE_KEY,
      useClass: AesService,
    },
  ],
};
