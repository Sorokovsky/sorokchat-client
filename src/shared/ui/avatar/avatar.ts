import { NgOptimizedImage } from '@angular/common';
import type { InputSignal } from '@angular/core';
import { input } from '@angular/core';
import { Component } from '@angular/core';

import { AVATAR_SIZE } from '../../data';
import type { AvatarType } from '../../models';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  public readonly type: InputSignal<AvatarType> = input.required<AvatarType>();
  public readonly value: InputSignal<string> = input.required<string>();
  public readonly size: InputSignal<number> = input<number>(AVATAR_SIZE);
}
