import type {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { from, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocaleTokenStorage } from './locale-token-storage';
import { RemoteTokenStorage } from './remote-token-storage';

export const authorizationInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const localeTokenStorage: LocaleTokenStorage = inject(LocaleTokenStorage);
  const remoteTokenStorage: RemoteTokenStorage = inject(RemoteTokenStorage);

  return from(localeTokenStorage.getToken()).pipe(
    switchMap((token: string | null): Observable<HttpEvent<unknown>> => {
      let clonedRequest: HttpRequest<unknown> = request;
      if (token && token.trim() !== '') {
        clonedRequest = remoteTokenStorage.setToken(token, request);
      }
      return next(clonedRequest).pipe(
        map((event: HttpEvent<unknown>): HttpEvent<unknown> => {
          if (event instanceof HttpResponse) {
            const newToken: string | null = remoteTokenStorage.getToken(event);
            if (newToken) {
              localeTokenStorage.setToken(newToken).then();
            }
          }
          return event;
        }),
      );
    }),
  );
};
