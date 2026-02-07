import {Injectable} from '@angular/core';
import {HttpHeaders as Headers, type HttpRequest, type HttpResponse} from '@angular/common/http';
import {HttpHeaders} from '@/constants/external/http-headers.constants'
import {Prefixes} from '@/constants/external/prefixes.constants';

@Injectable({
  providedIn: 'root',
})
export class RemoteAccessTokenService {
  public getAccessToken(response: HttpResponse<unknown>): string | null {
    const header: string | null = response.headers.get(HttpHeaders.Authorization.toLowerCase());
    if (header === null) return null;
    return header.trim().replace(Prefixes.BEARER, "");
  }

  public setAccessToken(request: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
    return request.clone({
      headers: new Headers({
        [HttpHeaders.Authorization]: `${Prefixes.BEARER} ${accessToken}`,
      })
    })
  }
}
