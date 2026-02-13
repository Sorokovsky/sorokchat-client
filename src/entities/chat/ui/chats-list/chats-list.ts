import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { Chat } from '../../models';
import { Avatar } from '@/shared';

@Component({
  selector: 'app-chats-list',
  imports: [RouterLink, Avatar],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.scss',
})
export class ChatsList {
  public readonly rootPath: InputSignal<string> = input.required<string>();
  public chats: InputSignal<Chat[]> = input.required<Chat[]>();

  public getChatPath(chat: Chat): string {
    return `${this.rootPath()}/${chat.id}`;
  }
}
