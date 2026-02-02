import {
  Component,
  computed,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import {ChatMessage} from '@/components/common/chat-messages/chat-messages.type';
import {injectProfileQuery, ProfileQuery} from '@/injections/profile.query';
import {AvatarComponent} from '@/components/ui/avatar/avatar.component';
import {formatDate} from '@/utils/format-date.util';

@Component({
  selector: 'app-message',
  imports: [
    AvatarComponent
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.sass',
})
export class MessageComponent implements OnInit, OnDestroy {
  public message: InputSignal<ChatMessage> = input.required<ChatMessage>();

  private readonly profile: ProfileQuery = injectProfileQuery();
  protected readonly tick: WritableSignal<number> = signal(Date.now());
  protected readonly formattedDate: Signal<string> = computed((): string => {
    this.tick();
    return formatDate(this.message().updatedAt);
  });
  private interval: number | undefined;

  public ngOnInit(): void {
    this.interval = setInterval((): void => {
      this.formattedDate();
      this.tick.set(Date.now());
    }, 1000);
  }

  public ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  protected isMyMessage(message: ChatMessage): boolean {
    return message.author?.id === this.profile.data()?.id;
  }
}
