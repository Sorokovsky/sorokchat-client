import {Component} from '@angular/core';
import {ChatsList} from '@/components/common/chats/chats-list/chats-list';
import {type GetChatsByMe, injectGetChatsByMe} from '@/injections/chats/get-chats-by-me.query';
import {ChatsBarTop} from '@/components/common/chats/chats-bar-top/chats-bar-top';

@Component({
  selector: 'app-chats-bar',
  imports: [
    ChatsList,
    ChatsBarTop
  ],
  templateUrl: './chats-bar.html',
  styleUrl: './chats-bar.sass',
})
export class ChatsBar {
  protected readonly myChats: GetChatsByMe = injectGetChatsByMe();
}
