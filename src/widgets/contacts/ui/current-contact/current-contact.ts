import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { User } from '@/entities';
import { UserAvatar } from '@/entities';

@Component({
  selector: 'app-current-contact',
  templateUrl: './current-contact.html',
  styleUrls: ['./current-contact.scss'],
  imports: [UserAvatar],
})
export class CurrentContact {
  public readonly contact: InputSignal<User> = input.required<User>();
}
