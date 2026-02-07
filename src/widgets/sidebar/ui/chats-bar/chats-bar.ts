import {Component} from '@angular/core';
import {type GetChatsByMe, injectGetChatsByMe} from '@/injections/chats/get-chats-by-me.query';
import {ChatsBarTop} from '@/widgets/sidebar/ui/chats-bar-top/chats-bar-top';
import {ChatsList} from '@/widgets/sidebar/ui/chats-list/chats-list';

@Component({
  selector: 'app-chat-bar',
  imports: [
    ChatsBarTop,
    ChatsList
  ],
  templateUrl: './chats-bar.html',
  styleUrl: './chats-bar.sass',
})
export class ChatsBar {
  protected readonly myChats: GetChatsByMe = injectGetChatsByMe();
}
