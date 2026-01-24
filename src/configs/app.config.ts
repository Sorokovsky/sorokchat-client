import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from '@/constants/app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authenticationInterceptor} from '@/interceptors/authentication-interceptor';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    provideTanStackQuery(new QueryClient()),
  ]
};
