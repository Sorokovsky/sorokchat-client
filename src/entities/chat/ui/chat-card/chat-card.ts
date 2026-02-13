import type { InputSignal, Signal } from '@angular/core';
import { computed } from '@angular/core';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import type { Chat } from '@/entities';
import { ChatAvatar } from '@/entities';
import { cutText } from '@/shared';

import { MAX_DESCRIPTION_LENGTH } from '../../config';

@Component({
  selector: 'app-chat-card',
  imports: [ChatAvatar, RouterLinkActive, RouterLink],
  templateUrl: './chat-card.html',
  styleUrl: './chat-card.scss',
})
export class ChatCard {
  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  public readonly rootPath: InputSignal<string> = input.required<string>();

  protected readonly description: Signal<string> = computed<string>((): string => {
    return cutText(this.chat().description, MAX_DESCRIPTION_LENGTH);
  });

  protected readonly link: Signal<string> = computed<string>((): string => {
    return `${this.rootPath()}/${this.chat().id}`;
  });
}
