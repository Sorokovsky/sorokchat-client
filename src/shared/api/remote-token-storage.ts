import type { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RemoteTokenStorage {
  private static readonly BEARER_PREFIX: string = 'Bearer ';
  private static readonly HEADER_NAME: string = 'Authorization';

  public setToken(token: string, request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      headers: new HttpHeaders({
        [RemoteTokenStorage.HEADER_NAME]: `${RemoteTokenStorage.BEARER_PREFIX}${token}`,
      }),
    });
  }

  public getToken(response: HttpResponse<unknown>): string | null {
    return (
      response.headers
        .get(RemoteTokenStorage.HEADER_NAME)
        ?.replace(RemoteTokenStorage.BEARER_PREFIX, '') || null
    );
  }
}
