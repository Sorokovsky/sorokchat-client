import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { cutText } from '@/shared';

import { MAX_DESCRIPTION_LENGTH } from '../../config';
import type { Chat } from '../../models';
import { ChatAvatar } from '../chat-avatar/chat-avatar';

@Component({
  selector: 'app-chats-list',
  imports: [RouterLink, ChatAvatar, RouterLinkActive],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.scss',
})
export class ChatsList {
  public readonly rootPath: InputSignal<string> = input.required<string>();
  public chats: InputSignal<Chat[]> = input.required<Chat[]>();

  public getChatPath(chat: Chat): string {
    return `${this.rootPath()}/${chat.id}`;
  }

  public getDescription(chat: Chat): string {
    return cutText(chat.description, MAX_DESCRIPTION_LENGTH);
  }
}
