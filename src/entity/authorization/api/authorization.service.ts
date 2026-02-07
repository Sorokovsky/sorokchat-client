import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {type RegisterPayload} from '@/feature';
import {lastValueFrom} from 'rxjs';
import {type User} from '@/entity/user';
import {ENDPOINTS, LocalAccessStorageService} from '@/shared';
import {LoginPayload} from '@/entity/authorization';

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
