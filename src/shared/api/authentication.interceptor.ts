import {
  type HttpEvent,
  type HttpHandlerFn,
  type HttpInterceptorFn,
  type HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {map, type Observable} from 'rxjs';
import {LocalAccessStorageService, RemoteAccessTokenService} from '@/shared/api';
import {inject} from '@angular/core';

export const authenticationInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const localAccessStorageService: LocalAccessStorageService = inject(LocalAccessStorageService);
  const remoteAccessStorageService: RemoteAccessTokenService = inject(RemoteAccessTokenService);
  const requestAccessToken: string | null = localAccessStorageService.getAccessKey();
  let changedRequest: HttpRequest<unknown> = request;
  if (requestAccessToken) {
    changedRequest = remoteAccessStorageService.setAccessToken(request, requestAccessToken);
  }
  const response: Observable<HttpEvent<unknown>> = next(changedRequest);
  return response.pipe(
    map((event: HttpEvent<unknown>): HttpEvent<unknown> => {
      if (event instanceof HttpResponse) {
        const accessToken: string | null = remoteAccessStorageService.getAccessToken(event);
        if (accessToken) {
          localAccessStorageService.setAccessKey(accessToken);
        }
      }
      return event;
    })
  );
};
