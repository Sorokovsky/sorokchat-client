import {localeInterceptor} from '@/shared/api/locale.interceptor';
import {authenticationInterceptor} from '@/shared/api/authentication.interceptor';
import {apiErrorInterceptor} from '@/shared/api/api-error.interceptor';
import {type HttpInterceptorFn} from '@angular/common/http';

export const interceptors: HttpInterceptorFn[] = [localeInterceptor, authenticationInterceptor, apiErrorInterceptor];
