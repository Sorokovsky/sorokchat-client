import {type ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideToastr} from "ngx-toastr";

import {routes} from '@/app/routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {interceptors} from '@/shared';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "uk-UA"
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors(interceptors)),
    provideTanStackQuery(new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          refetchOnMount: false,
          refetchOnWindowFocus: false
        }
      }
    })),
    provideToastr()
  ]
};
