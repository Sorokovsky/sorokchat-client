import {
  Component,
  computed,
  input,
  type InputSignal,
  type OnDestroy,
  type OnInit,
  signal,
  type Signal,
  type WritableSignal
} from '@angular/core';
import {Avatar} from '@/shared/ui/avatar/avatar';
import {getUserInitials} from '@/shared/util/get-user-initials.util';
import {type ChatMessage} from '@/entity/message/models/chat-message.type';
import {formatDate} from '@/shared/util/format-date.util';
import {injectProfileQuery, type ProfileQuery} from '@/injections/authorization/profile.query';

@Component({
  selector: 'app-message-item',
  imports: [
    Avatar
  ],
  templateUrl: './message-item.html',
  styleUrl: './message-item.sass',
})
export class MessageItem implements OnInit, OnDestroy {
  public readonly currentMessage: InputSignal<ChatMessage> = input.required<ChatMessage>();
  protected readonly profile: ProfileQuery = injectProfileQuery();
  protected readonly authorInitials: Signal<string> = computed((): string => getUserInitials(this.currentMessage().author));
  private readonly tick: WritableSignal<Date> = signal<Date>(new Date());
  protected readonly formattedDate: Signal<string> = computed((): string => {
    this.tick();
    return formatDate(this.currentMessage().updatedAt)
  });
  protected readonly isMe: Signal<boolean> = computed((): boolean => this.currentMessage().author?.id === this.profile.data()?.id);
  private interval: number | null = null;

  public ngOnInit(): void {
    this.interval = setInterval((): void => {
      this.tick.set(new Date());
    }, 1000);
  }

  public ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
