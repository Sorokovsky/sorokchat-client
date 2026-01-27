import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterPayload} from '@/contracts/register-payload.contract';
import {lastValueFrom} from 'rxjs';
import {ENDPOINTS} from '@/constants/endpoints.constants';
import {User} from '@/contracts/user.contrcact';
import {LoginPayload} from '@/contracts/login-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly client: HttpClient;

  constructor(http: HttpClient) {
    this.client = http;
  }

  public async register(payload: RegisterPayload): Promise<User> {
    return lastValueFrom(this.client.post<User>(ENDPOINTS.REGISTER, payload));
  }

  public async login(payload: LoginPayload): Promise<User> {
    return lastValueFrom(this.client.post<User>(ENDPOINTS.LOGIN, payload));
  }

  public async logout(): Promise<void> {
    return lastValueFrom(this.client.delete<void>(ENDPOINTS.LOGOUT));
  }

  public async getProfile(): Promise<User> {
    return lastValueFrom(this.client.get<User>(ENDPOINTS.PROFILE));
  }
}
