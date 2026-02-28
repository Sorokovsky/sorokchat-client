import type { HttpInterceptorFn } from '@angular/common/http';

import { accessTokenInterceptor } from './access-token.interceptor';
import { errorInterceptor } from './error.interceptor';
import { localeInterceptor } from './locale.interceptor';

export const INTERCEPTORS: HttpInterceptorFn[] = [
  localeInterceptor,
  accessTokenInterceptor,
  errorInterceptor,
];
