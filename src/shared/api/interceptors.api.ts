import type { HttpInterceptorFn } from '@angular/common/http';

import { authorizationInterceptor } from './authorization-interceptor';
import { errorInterceptor } from './error-interceptor';

export const INTERCEPTORS: HttpInterceptorFn[] = [authorizationInterceptor, errorInterceptor];
