import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { IconType } from '../../models';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-action-icon',
  imports: [Icon],
  templateUrl: './action-icon.html',
  styleUrl: './action-icon.scss',
})
export class ActionIcon {
  public readonly icon: InputSignal<IconType> = input.required<IconType>();
  public readonly isActive: InputSignal<boolean> = input<boolean>(false);
}
