import { inject, Injectable } from '@angular/core';

import type { MessagePayload } from '@/entities';
import type { StorageService } from '@/shared';
import { STORAGE_SERVICE } from '@/shared';

@Injectable({
  providedIn: 'root',
})
export class MessagesRepository {
  private static readonly KEY: string = 'messages';

  private readonly storageService: StorageService = inject(STORAGE_SERVICE);

  public async getMessages(): Promise<MessagePayload[]> {
    return (await this.storageService.get<MessagePayload[]>(MessagesRepository.KEY)) || [];
  }

  public async saveMessages(messages: MessagePayload[]): Promise<void> {
    await this.storageService.set<MessagePayload[]>(MessagesRepository.KEY, messages);
  }

  public async clearMessages(): Promise<void> {
    await this.storageService.remove(MessagesRepository.KEY);
  }
}
