import {Component, computed, input, type InputSignal, type Signal} from '@angular/core';
import {Avatar} from '@/components/ui/avatar/avatar';
import {getUserInitials} from '@/utils/get-user-initials.util';
import {type ChatMessage} from '@/types/chst-message.type';
import {formatDate} from '@/utils/format-date.util';
import {injectProfileQuery, type ProfileQuery} from '@/injections/authorization/profile.query';

@Component({
  selector: 'app-message-item',
  imports: [
    Avatar
  ],
  templateUrl: './message-item.html',
  styleUrl: './message-item.sass',
})
export class MessageItem {
  public readonly currentMessage: InputSignal<ChatMessage> = input.required<ChatMessage>();
  protected readonly profile: ProfileQuery = injectProfileQuery();
  protected readonly authorInitials: Signal<string> = computed((): string => getUserInitials(this.currentMessage().author));
  protected readonly formattedDate: Signal<string> = computed((): string => formatDate(this.currentMessage().updatedAt));
  protected readonly isMe: Signal<boolean> = computed((): boolean => this.currentMessage().author?.id === this.profile.data()?.id);
}
