import type { HttpInterceptorFn } from '@angular/common/http';

import { errorInterceptor } from './error.interceptor';
import { localeInterceptor } from './locale.interceptor';

export const INTERCEPTORS: HttpInterceptorFn[] = [localeInterceptor, errorInterceptor];
