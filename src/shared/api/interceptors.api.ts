import type { HttpInterceptorFn } from '@angular/common/http';

import { authorizationInterceptor } from './authorization-interceptor';

export const INTERCEPTORS: HttpInterceptorFn[] = [authorizationInterceptor];
