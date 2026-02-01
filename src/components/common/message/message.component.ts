import {Component, input, InputSignal} from '@angular/core';
import {ChatMessage} from '@/components/common/chat-messages/chat-messages.type';
import {injectProfileQuery, ProfileQuery} from '@/injections/profile.query';
import {AvatarComponent} from '@/components/ui/avatar/avatar.component';

@Component({
  selector: 'app-message',
  imports: [
    AvatarComponent
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.sass',
})
export class MessageComponent {
  public message: InputSignal<ChatMessage> = input.required<ChatMessage>();

  private readonly profile: ProfileQuery = injectProfileQuery();

  protected isMyMessage(message: ChatMessage): boolean {
    return message.author?.id === this.profile.data()?.id;
  }
}
