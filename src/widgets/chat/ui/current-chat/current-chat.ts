import type { InputSignal } from '@angular/core';
import { input } from '@angular/core';
import { Component } from '@angular/core';

import type { Chat } from '@/entities';
import { SendMessageForm } from '@/features';

import { ChatHead } from '../chat-head/chat-head';

@Component({
  selector: 'app-current-chat',
  imports: [ChatHead, SendMessageForm],
  templateUrl: './current-chat.html',
  styleUrl: './current-chat.scss',
})
export class CurrentChat {
  public readonly chat: InputSignal<Chat> = input.required<Chat>();

}
