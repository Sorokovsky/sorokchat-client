import {Component} from '@angular/core';
import {GetChatsByMe, injectGetChatsByMe} from '@/injections/get-chats-by-me.query';
import {RouterLink} from '@angular/router';
import {CHAT_PAGE} from '@/constants/pages.constants';

@Component({
  selector: 'app-chats-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './chats-sidebar.component.html',
  styleUrl: './chats-sidebar.component.sass',
})
export class ChatsSidebarComponent {
  protected readonly chatsQuery: GetChatsByMe = injectGetChatsByMe();
  protected readonly chatPath: string = CHAT_PAGE.path;
}
