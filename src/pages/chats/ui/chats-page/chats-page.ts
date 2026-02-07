import {Component, type Signal} from '@angular/core';
import {type Chat, injectCurrentChat} from '@/entity';
import {CurrentChat, NoChat} from '@/widgets';

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
