import {type HttpEvent, type HttpHandlerFn, type HttpInterceptorFn, type HttpRequest} from '@angular/common/http';
import {type Observable} from 'rxjs';
import {inject, LOCALE_ID} from '@angular/core';
import {HttpHeaders} from '@/constants/external/http-headers.constants';

export const localeInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const locale: string = inject(LOCALE_ID);
  return next(request.clone({
    headers: request.headers.set(HttpHeaders.ACCEPT_LANGUAGE, locale)
  }));
};
