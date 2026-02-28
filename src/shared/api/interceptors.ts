import type { HttpInterceptorFn } from '@angular/common/http';

import { errorInterceptor } from './error.interceptor';

export const INTERCEPTORS: HttpInterceptorFn[] = [errorInterceptor];
