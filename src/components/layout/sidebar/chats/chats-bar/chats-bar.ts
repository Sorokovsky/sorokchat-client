import {Component} from '@angular/core';
import {type GetChatsByMe, injectGetChatsByMe} from '@/injections/chats/get-chats-by-me.query';

@Component({
  selector: 'app-chat-bar',
  imports: [],
  templateUrl: './chats-bar.html',
  styleUrl: './chats-bar.sass',
})
export class ChatsBar {
  protected readonly myChats: GetChatsByMe = injectGetChatsByMe();
}
