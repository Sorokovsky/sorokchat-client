import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {type RegisterPayload} from '@/contracts/authorization/register-payload.contract';
import {lastValueFrom} from 'rxjs';
import {ENDPOINTS} from '@/constants/external/endpoints.constants';
import {type User} from '@/contracts/user/user.contrcact';
import {type LoginPayload} from '@/contracts/authorization/login-payload';
import {LocalAccessStorageService} from '@/services/utils/local-access-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly client: HttpClient;
  private readonly localAccessTokenStorage: LocalAccessStorageService;

  constructor(http: HttpClient, localAccessTokenStorage: LocalAccessStorageService) {
    this.client = http;
    this.localAccessTokenStorage = localAccessTokenStorage;
  }

  public async register(payload: RegisterPayload): Promise<User> {
    return lastValueFrom(this.client.post<User>(ENDPOINTS.REGISTER, payload));
  }

  public async login(payload: LoginPayload): Promise<User> {
    return lastValueFrom(this.client.post<User>(ENDPOINTS.LOGIN, payload));
  }

  public async logout(): Promise<void> {
    const result: void = await lastValueFrom(this.client.delete<void>(ENDPOINTS.LOGOUT));
    this.localAccessTokenStorage.clearAccessKey();
    return result;
  }

  public async getProfile(): Promise<User> {
    return lastValueFrom(this.client.get<User>(ENDPOINTS.PROFILE));
  }
}
