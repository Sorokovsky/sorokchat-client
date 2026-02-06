import {Component, input, type InputSignal} from '@angular/core';
import {type Chat} from '@/contracts/chat.contract';
import {RouterLink} from '@angular/router';
import {removeDynamicRoute} from '@/utils/replace-dynamic-route.util';
import {CHATS_PAGE} from '@/constants/pages.constants';

@Component({
  selector: 'app-chats-list',
  imports: [
    RouterLink
  ],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.sass',
})
export class ChatsList {
  public readonly chats: InputSignal<Chat[]> = input.required<Chat[]>();
  private readonly rootPath: string = removeDynamicRoute(CHATS_PAGE.path);

  protected getChatLink(chat: Chat): string {
    return `${this.rootPath}/${chat.id}`;
  }
}
