import type { InputSignal } from '@angular/core';
import { input } from '@angular/core';
import { Component } from '@angular/core';

import type { ButtonType, IconType } from '../../models';
import { ActionIcon } from '../action-icon/action-icon';

@Component({
  selector: 'app-action-button',
  imports: [ActionIcon],
  templateUrl: './action-button.html',
  styleUrl: './action-button.scss',
})
export class ActionButton {
  public readonly icon: InputSignal<IconType> = input.required<IconType>();
  public readonly type: InputSignal<ButtonType> = input<ButtonType>("button");
}
