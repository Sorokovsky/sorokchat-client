import {Component, input, InputSignal, OnInit} from '@angular/core';
import {Chat} from '@/contracts/chat.contract';
import {ChatHeaderComponent} from '@/components/common/chat-header/chat-header.component';
import {ChatMessagesComponent} from '@/components/common/chat-messages/chat-messages.component';
import {ChatSendMessageComponent} from '@/components/common/chat-send-message/chat-send-message.component';
import {WebSocketService} from '@/services/web-socket.service';
import {GetChatsByMe, injectGetChatsByMe} from '@/injections/get-chats-by-me.query';

@Component({
  selector: 'app-chat',
  imports: [
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatSendMessageComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass',
})
export class ChatComponent implements OnInit {
  public chat: InputSignal<Chat> = input.required<Chat>();
  private readonly chats: GetChatsByMe = injectGetChatsByMe();

  constructor(private readonly webSocketService: WebSocketService) {
  }

  public ngOnInit() {
    this.connectToChats();
  }

  private connectToChats(): void {
    this.webSocketService.connect();
    const myChats: Chat[] = this.chats.data() || [];
    for (const chat of myChats) {
      const path: string = `/chat/${chat.id}`
      this.webSocketService.subscribe(path);
    }
  }
}
