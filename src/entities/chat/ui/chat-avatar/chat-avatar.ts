import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import { Avatar } from '@/shared';

import type { Chat } from '../../models';

@Component({
  selector: 'app-chat-avatar',
  imports: [Avatar],
  templateUrl: './chat-avatar.html',
  styleUrl: './chat-avatar.scss',
})
export class ChatAvatar {
  public readonly chat: InputSignal<Chat> = input.required<Chat>();
}
