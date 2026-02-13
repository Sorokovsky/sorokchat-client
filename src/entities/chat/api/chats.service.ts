import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Endpoints } from '@/shared';

import type { Chat, NewChat } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private readonly client: HttpClient = inject(HttpClient);

  public async createChat(payload: NewChat): Promise<Chat> {
    return await lastValueFrom<Chat>(this.client.post<Chat>(Endpoints.CREATE_CHAT, payload));
  }

  public async getChatsByMe(): Promise<Chat[]> {
    return await lastValueFrom<Chat[]>(this.client.get<Chat[]>(Endpoints.GET_CHATS_BY_ME));
  }

  public async deleteChatById(id: number): Promise<void> {
    const rootPath: string = Endpoints.CHATS;
    return await lastValueFrom<void>(this.client.delete<void>(`${rootPath}/${id}`));
  }
}
