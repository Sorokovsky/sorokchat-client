import {Component, input, InputSignal} from '@angular/core';
import {Chat} from '@/contracts/chat.contract';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.sass',
})
export class ChatHeaderComponent {
  public chat: InputSignal<Chat> = input.required<Chat>();
}
