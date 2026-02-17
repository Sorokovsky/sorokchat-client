import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { MessagesService } from '@/entities';
import { WebSocketService } from '@/shared';
import { LocaleTokenStorage } from '@/shared';
import { Endpoints } from '@/shared';

import type { User } from '../../user/@x/authorization';
import type { LoginPayload, RegisterPayload } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private readonly client: HttpClient = inject(HttpClient);
  private readonly messagesService: MessagesService = inject(MessagesService);
  private readonly tokenStorageService: LocaleTokenStorage = inject(LocaleTokenStorage);
  private readonly webSocketService: WebSocketService = inject(WebSocketService);

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
    await lastValueFrom(this.client.delete<void>(Endpoints.LOGOUT));
    await this.tokenStorageService.clearToken();
    await this.messagesService.clearMessages();
    this.webSocketService.deactivate();
  }
}
