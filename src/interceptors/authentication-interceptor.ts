import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {LocalAccessStorageService} from '@/services/local-access-storage-service';
import {inject} from '@angular/core';
import {RemoteAccessTokenService} from '@/services/remote-access-token-service';

export const authenticationInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const localAccessStorageService: LocalAccessStorageService = inject(LocalAccessStorageService);
  const remoteAccessStorageService: RemoteAccessTokenService = inject(RemoteAccessTokenService);
  const requestAccessToken: string | null = localAccessStorageService.getAccessKey();
  let changedRequest: HttpRequest<unknown> = request;
  if (requestAccessToken) {
    changedRequest = remoteAccessStorageService.setAccessToken(request, requestAccessToken);
  }
  const response: Observable<HttpEvent<unknown>> = next(changedRequest);
  response.pipe(
    tap((event: HttpEvent<unknown>): void => {
      if (event instanceof HttpResponse) {
        const accessToken: string | null = remoteAccessStorageService.getAccessToken(event);
        if (accessToken) {
          localAccessStorageService.setAccessKey(accessToken);
        }
      }
    })
  );
  return response;
};
