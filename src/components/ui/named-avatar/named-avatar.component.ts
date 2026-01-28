import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {User} from '@/contracts/user.contrcact';
import {getUserInitials} from '@/utils/get-user-initials.util';

@Component({
  selector: 'app-named-avatar',
  imports: [],
  templateUrl: './named-avatar.component.html',
  styleUrl: './named-avatar.component.sass',
})
export class NamedAvatarComponent {
  public readonly user: InputSignal<User> = input.required<User>();
  protected readonly initials: Signal<string> = computed(() => getUserInitials(this.user()));
}
