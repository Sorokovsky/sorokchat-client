import type { Signal } from '@angular/core';
import { Component } from '@angular/core';

import { injectParameter } from '@/shared';

@Component({
  selector: 'app-chats-page',
  imports: [],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.scss',
})
export class ChatsPage {
  public readonly chatId: Signal<string | null> = injectParameter('chatId');
}
