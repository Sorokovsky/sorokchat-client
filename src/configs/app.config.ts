import {ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideToastr} from "ngx-toastr";

import {routes} from '@/constants/app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authenticationInterceptor} from '@/interceptors/authentication.interceptor';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {apiErrorInterceptor} from '@/interceptors/api-error.interceptor';
import {localeInterceptor} from '@/interceptors/locale.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "uk-UA"
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([localeInterceptor, authenticationInterceptor, apiErrorInterceptor])),
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
