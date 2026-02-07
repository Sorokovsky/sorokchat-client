import {Component, computed, input, type InputSignal, type Signal} from '@angular/core';
import {Avatar, cutText, removeDynamicRoute} from "@/shared";
import {type Chat} from '@/entity';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CHATS_PAGE} from '@/app/routes';
import {MAX_DESCRIPTION_LENGTH} from '@/widgets/sidebar/model';

@Component({
  selector: 'app-chat-card',
  imports: [
    Avatar,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './chat-card.html',
  styleUrl: './chat-card.sass',
})
export class ChatCard {
  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  protected description: Signal<string> = computed((): string => cutText(this.chat().description, MAX_DESCRIPTION_LENGTH));
  private readonly rootPath: string = removeDynamicRoute(CHATS_PAGE.path);
  protected link: Signal<string> = computed((): string => `${this.rootPath}/${this.chat().id}`);
}
