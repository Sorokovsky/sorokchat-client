import type {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { from, switchMap } from 'rxjs';

import { Headers, StorageKeys } from '../data';
import type { StorageService } from '../utils';
import { STORAGE_SERVICE } from './injection.tokens';

export const accessTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const storageService: StorageService = inject(STORAGE_SERVICE);
  return from(storageService.get<string>(StorageKeys.ACCESS_TOKEN)).pipe(
    switchMap((token: string | null): Observable<HttpEvent<unknown>> => {
      let clonnedRequest: HttpRequest<unknown> = request;
      if (token && token.trim() !== '') {
        clonnedRequest = request.clone({
          headers: request.headers.set(Headers.AUTHORIZATION, `Bearer ${token}`),
        });
      }
      return next(clonnedRequest);
    }),
  );
};
