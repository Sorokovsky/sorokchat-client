import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Endpoints } from '@/shared';

import type { User } from '../../user/@x/authorization';
import type { LoginPayload, RegisterPayload } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private readonly client: HttpClient = inject(HttpClient);

  public async getProfile(): Promise<User> {
    return await lastValueFrom(this.client.get<User>(Endpoints.PROFILE));
  }

  public async register(payload: RegisterPayload): Promise<User> {
    return await lastValueFrom(this.client.post<User>(Endpoints.REGISTER, payload));
  }

  public async login(payload: LoginPayload): Promise<User> {
    return await lastValueFrom(this.client.post<User>(Endpoints.LOGIN, payload));
  }

  public async logout(): Promise<void> {
    return await lastValueFrom(this.client.delete<void>(Endpoints.LOGOUT));
  }
}
