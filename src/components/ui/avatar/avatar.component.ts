import {Component, input, InputSignal} from '@angular/core';
import {User} from '@/contracts/user.contrcact';
import {DefaultAvatarComponent} from '@/components/ui/default-avatar/default-avatar.component';
import {NamedAvatarComponent} from '@/components/ui/named-avatar/named-avatar.component';

@Component({
  selector: 'app-avatar',
  imports: [
    DefaultAvatarComponent,
    NamedAvatarComponent
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.sass',
})
export class AvatarComponent {
  public readonly user: InputSignal<User | undefined> = input<User | undefined>(undefined);
}
