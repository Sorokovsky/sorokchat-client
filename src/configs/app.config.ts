import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideToastr} from "ngx-toastr";

import {routes} from '@/constants/app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authenticationInterceptor} from '@/interceptors/authentication.interceptor';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {apiErrorInterceptor} from '@/interceptors/api-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authenticationInterceptor, apiErrorInterceptor])),
    provideTanStackQuery(new QueryClient()),
    provideToastr()
  ]
};
