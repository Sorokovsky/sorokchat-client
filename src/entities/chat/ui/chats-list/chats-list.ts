import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { Chat } from '../../models';
import { ChatCard } from '../chat-card/chat-card';

@Component({
  selector: 'app-chats-list',
  imports: [ChatCard],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.scss',
})
export class ChatsList {
  public readonly rootPath: InputSignal<string> = input.required<string>();
  public chats: InputSignal<Chat[]> = input.required<Chat[]>();
}
