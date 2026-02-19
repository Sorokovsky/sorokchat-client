import type { InputSignal, ResourceLoaderParams, ResourceRef, Signal } from '@angular/core';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { computed, resource } from '@angular/core';
import { inject } from '@angular/core';
import { Component, input } from '@angular/core';

import { Avatar, formatDate } from '@/shared';

import type { GetProfileQuery } from '../../../authorization/@x/message';
import { injectGetProfile } from '../../../authorization/@x/message';
import type { Chat } from '../../../chat/@x/message';
import { UserAvatar } from '../../../user/@x/chat';
import { MessagesService } from '../../api';
import type { ChatMessagePayload, MessagePayload } from '../../models';
import { prepareMessage } from '../../util';

interface Params {
  chat: Chat;
  messages: MessagePayload[];
}

@Component({
  selector: 'app-message-list',
  imports: [UserAvatar, Avatar],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageList {
  private readonly messagesService: MessagesService = inject(MessagesService);
  private readonly profile: GetProfileQuery = injectGetProfile();
  private readonly injector: EnvironmentInjector = inject(EnvironmentInjector);

  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  private readonly messagesResource: ResourceRef<ChatMessagePayload[] | undefined> = resource({
    params: (): Params => ({
      chat: this.chat(),
      messages: this.messagesService.messages(),
    }),
    loader: async ({
      params: { chat, messages },
    }: ResourceLoaderParams<Params>): Promise<ChatMessagePayload[]> => {
      return Promise.all(
        messages
          .filter((message: MessagePayload): boolean => message.chatId === chat.id)
          .map(
            async (message: MessagePayload): Promise<ChatMessagePayload> =>
              await runInInjectionContext(
                this.injector,
                (): Promise<ChatMessagePayload> => prepareMessage(message, chat),
              ),
          ),
      );
    },
  });

  protected readonly messages: Signal<ChatMessagePayload[]> = computed<ChatMessagePayload[]>(
    (): ChatMessagePayload[] => {
      return this.messagesResource.value() || [];
    },
  );
  protected readonly formatDate: (date: Date | string | number) => string = formatDate;

  protected isMy(message: ChatMessagePayload): boolean {
    return this.profile.data()?.id === message.author?.id;
  }
}
