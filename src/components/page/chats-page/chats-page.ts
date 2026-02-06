import {Component, type Signal} from '@angular/core';
import {type Chat} from '@/contracts/chat.contract';
import {injectCurrentChat} from '@/injections/current-chat.injection';
import {NoChat} from '@/components/common/no-chat/no-chat';

@Component({
  selector: 'app-chats-page',
  imports: [
    NoChat
  ],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.sass',
})
export class ChatsPage {
  protected currentChat: Signal<Chat | null> = injectCurrentChat();
}
