import {Component, computed, inject, Signal} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {GetChatsByMe, injectGetChatsByMe} from '@/injections/get-chats-by-me.query';
import {Chat} from '@/contracts/chat.contract';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ChatHeaderComponent} from '@/components/common/chat-header/chat-header.component';
import {ChatSendMessageComponent} from '@/components/common/chat-send-message/chat-send-message.component';

@Component({
  selector: 'app-chat',
  imports: [
    ChatHeaderComponent,
    ChatSendMessageComponent
  ],
  templateUrl: './chat.page.html',
  styleUrl: './chat.page.sass',
})
export class ChatPage {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly chatsQuery: GetChatsByMe = injectGetChatsByMe();
  private readonly chatId: Signal<string | undefined> = toSignal<string>(this.route.params
      .pipe(
        map((parameter: Params): string => parameter["chatId"])
      ),
    {initialValue: this.route.snapshot.params['chatId']}
  );
  protected readonly chat: Signal<Chat | null> = computed((): Chat | null => {
    const chatId: string | undefined = this.chatId();
    if (Number.isNaN(chatId)) return null;
    const id: number = Number(this.chatId());
    const chats: Chat[] | undefined = this.chatsQuery.data();
    return chats?.find((chat: Chat): boolean => chat.id === id) ?? null;
  });
}
