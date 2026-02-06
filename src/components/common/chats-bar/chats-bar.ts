import {Component} from '@angular/core';
import {ChatsList} from '@/components/common/chats-list/chats-list';
import {type GetChatsByMe, injectGetChatsByMe} from '@/injections/get-chats-by-me.query';

@Component({
  selector: 'app-chats-bar',
  imports: [
    ChatsList
  ],
  templateUrl: './chats-bar.html',
  styleUrl: './chats-bar.sass',
})
export class ChatsBar {
  protected readonly myChats: GetChatsByMe = injectGetChatsByMe();
}
