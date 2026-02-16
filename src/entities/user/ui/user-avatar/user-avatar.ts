import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import { Avatar } from '@/shared';

import type { User } from '../../models';

@Component({
  selector: 'app-user-avatar',
  imports: [Avatar],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  public user: InputSignal<User> = input.required<User>();
}
