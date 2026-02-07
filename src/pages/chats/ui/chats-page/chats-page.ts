import {Component, type Signal} from '@angular/core';
import {type Chat} from '@/entity/chat/model/chat.contract';
import {injectCurrentChat} from '@/entity/chat/api/current-chat.injection';
import {NoChat} from '@/widgets/current-chat/ui/no-chat/no-chat';
import {CurrentChat} from '@/widgets/current-chat/ui/current-chat/current-chat';

@Component({
  selector: 'app-chat-page',
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
