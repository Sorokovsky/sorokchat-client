import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools';

import { AngularStorageService, INTERCEPTORS, STORAGE_SERVICE } from '@/shared';

import { routes } from '../routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors(INTERCEPTORS)),
    provideTanStackQuery(new QueryClient(), withDevtools()),
    {
      provide: STORAGE_SERVICE,
      useClass: AngularStorageService,
    },
    {
      provide: LOCALE_ID,
      useValue: 'uk-UA',
    },
  ],
};
