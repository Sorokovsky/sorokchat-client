import type {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

import { LocaleTokenStorage } from './locale-token-storage';
import { RemoteTokenStorage } from './remote-token-storage';

export const authorizationInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const localeStorage: LocaleTokenStorage = inject(LocaleTokenStorage);
  const remoteStorage: RemoteTokenStorage = inject(RemoteTokenStorage);
  return next(remoteStorage.setToken(localeStorage.getToken(), request)).pipe(
    map((event: HttpEvent<unknown>): HttpEvent<unknown> => {
      if (event instanceof HttpResponse) {
        const token: string | null = remoteStorage.getToken(event);
        if (token) {
          localeStorage.setToken(token);
        }
      }
      return event;
    }),
  );
};
