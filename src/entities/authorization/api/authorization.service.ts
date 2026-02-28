import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import type { StorageService } from '@/shared';
import { Endpoints, STORAGE_SERVICE, StorageKeys } from '@/shared';

import type { UserPayload } from '../../user/@x/authorization';
import type { AuthorizedPayload, LoginPayload, RegisterPayload } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private readonly storageService: StorageService = inject(STORAGE_SERVICE);
  private readonly client: HttpClient = inject(HttpClient);

  public async register(payload: RegisterPayload): Promise<void> {
    const result: AuthorizedPayload = await lastValueFrom<AuthorizedPayload>(
      this.client.post<AuthorizedPayload>(Endpoints.REGISTER, payload),
    );
    await this.authorize(result);
  }

  public async login(payload: LoginPayload): Promise<void> {
    const result: AuthorizedPayload = await lastValueFrom<AuthorizedPayload>(
      this.client.post<AuthorizedPayload>(Endpoints.LOGIN, payload),
    );
    await this.authorize(result);
  }

  public async logout(): Promise<void> {
    await lastValueFrom(this.client.delete(Endpoints.LOGOUT));
    await this.storageService.remove(StorageKeys.ACCESS_TOKEN);
  }

  public async profile(): Promise<UserPayload> {
    return await lastValueFrom<UserPayload>(this.client.get<UserPayload>(Endpoints.PROFILE));
  }

  public async refreshTokens(): Promise<void> {
    const result: AuthorizedPayload = await lastValueFrom<AuthorizedPayload>(
      this.client.put<AuthorizedPayload>(Endpoints.REFRESH_TOKENS, null),
    );
    await this.authorize(result);
  }

  private async authorize(payload: AuthorizedPayload): Promise<void> {
    await this.storageService.set(StorageKeys.ACCESS_TOKEN, payload.accessToken);
  }
}
