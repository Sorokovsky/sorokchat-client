import {Injectable} from '@angular/core';
import {HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RemoteAccessTokenService {
  private static HEADER_NAME: string = "Authorization";
  private static BEARER_PREFIX: string = "Bearer ";

  public getAccessToken(response: HttpResponse<unknown>): string | null {
    const header: string | null = response.headers.get(RemoteAccessTokenService.HEADER_NAME);
    if (header === null) return null;
    return header.replace(RemoteAccessTokenService.BEARER_PREFIX, "");
  }

  public setAccessToken(request: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
    return request.clone({
      headers: new HttpHeaders({
        [RemoteAccessTokenService.HEADER_NAME]: `${RemoteAccessTokenService.BEARER_PREFIX}${accessToken}`,
      })
    })
  }
}
