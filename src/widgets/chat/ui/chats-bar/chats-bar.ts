import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { GetMyChats } from '@/entities';
import { ChatsList, injectGetMyChats } from '@/entities';

import { ChatsBarHead } from '../chats-bar-head/chats-bar-head';

@Component({
  selector: 'app-chats-bar',
  imports: [ChatsBarHead, ChatsList],
  templateUrl: './chats-bar.html',
  styleUrl: './chats-bar.scss',
})
export class ChatsBar {
  public readonly rootPath: InputSignal<string> = input.required<string>();
  protected readonly myChats: GetMyChats = injectGetMyChats();
}
