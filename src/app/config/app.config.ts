import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import {
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools';

import {
  AesService,
  AngularStorageService,
  ENCRYPTION_SERVICE,
  HmacService,
  INTERCEPTORS,
  SIGNING_SERVICE,
  STORAGE_SERVICE,
} from '@/shared';

import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors(INTERCEPTORS)),
    provideServiceWorker('ngsw-worker.js', {
      enabled: true,
    }),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            retryOnMount: false,
            staleTime: 0,
          },
        },
      }),
      withDevtools(),
    ),
    {
      provide: STORAGE_SERVICE,
      useClass: AngularStorageService,
    },
    {
      provide: LOCALE_ID,
      useValue: 'uk-UA',
    },
    {
      provide: SIGNING_SERVICE,
      useClass: HmacService,
    },
    {
      provide: ENCRYPTION_SERVICE,
      useClass: AesService,
    },
  ],
};
