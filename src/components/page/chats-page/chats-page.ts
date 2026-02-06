import {Component, type Signal} from '@angular/core';
import {type GetChatsByMe, injectGetChatsByMe} from '@/injections/get-chats-by-me.query';
import {injectRouteParameter} from '@/injections/route-parameter.injection';

@Component({
  selector: 'app-chats-page',
  imports: [],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.sass',
})
export class ChatsPage {
  protected readonly chatId: Signal<string | null> = injectRouteParameter("chatId");
  private readonly chatsQuery: GetChatsByMe = injectGetChatsByMe();
}
