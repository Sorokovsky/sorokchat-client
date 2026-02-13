import type {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, LOCALE_ID } from '@angular/core';
import type { Observable } from 'rxjs';

export const localeInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const locale: string = inject(LOCALE_ID);
  return next(
    request.clone({
      headers: request.headers.set('Accept-Language', locale),
    }),
  );
};
