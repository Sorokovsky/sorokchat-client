import {apiErrorInterceptor, authenticationInterceptor, localeInterceptor} from '@/shared/api';
import {type HttpInterceptorFn} from '@angular/common/http';

export const interceptors: HttpInterceptorFn[] = [localeInterceptor, authenticationInterceptor, apiErrorInterceptor];
