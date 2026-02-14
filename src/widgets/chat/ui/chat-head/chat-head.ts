import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { Chat } from '@/entities';
import { ChatAvatar } from '@/entities';
import { GetChatInfoAction } from '@/features';
import { Heading } from '@/shared';

@Component({
  selector: 'app-chat-head',
  imports: [ChatAvatar, Heading, GetChatInfoAction],
  templateUrl: './chat-head.html',
  styleUrl: './chat-head.scss',
})
export class ChatHead {
  public chat: InputSignal<Chat> = input.required<Chat>();
}
