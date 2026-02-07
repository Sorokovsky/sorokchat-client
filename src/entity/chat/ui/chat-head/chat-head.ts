import {Component, input, type InputSignal} from '@angular/core';
import {type Chat} from '@/entity/chat';
import {Avatar} from '@/shared';
import {EllipsisIcon, LucideAngularModule, type LucideIconData} from 'lucide-angular';

@Component({
  selector: 'app-chat-head',
  imports: [
    Avatar,
    LucideAngularModule
  ],
  templateUrl: './chat-head.html',
  styleUrl: './chat-head.sass',
})
export class ChatHead {
  public readonly currentChat: InputSignal<Chat> = input.required<Chat>();
  protected readonly infoIcon: LucideIconData = EllipsisIcon;
}
