import {Component, input, InputSignal} from '@angular/core';
import {Message} from '@/contracts/messages/message.contract';

@Component({
  selector: 'app-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.sass',
})
export class MessageItem {
  public currentMessage: InputSignal<Message> = input.required<Message>();
}
