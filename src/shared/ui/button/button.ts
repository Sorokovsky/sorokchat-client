import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { ButtonType } from '../../models';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public readonly isDisabled: InputSignal<boolean> = input<boolean>(false);
  public readonly type: InputSignal<ButtonType> = input<ButtonType>('button');
}
