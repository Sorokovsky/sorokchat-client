import {Component, type Signal} from '@angular/core';
import {type Chat} from '@/contracts/chats/chat.contract';
import {injectCurrentChat} from '@/injections/chats/current-chat.injection';
import {NoChat} from '@/components/common/chats/no-chat/no-chat';
import {CurrentChat} from '@/components/common/chats/current-chat/current-chat';

@Component({
  selector: 'app-chats-page',
  imports: [
    NoChat,
    CurrentChat
  ],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.sass',
})
export class ChatsPage {
  protected currentChat: Signal<Chat | null> = injectCurrentChat();
}
