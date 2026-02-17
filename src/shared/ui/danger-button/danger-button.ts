import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { ButtonType } from '@/shared';

@Component({
  selector: 'app-danger-button',
  imports: [],
  templateUrl: './danger-button.html',
  styleUrl: './danger-button.scss',
})
export class DangerButton {
  public type: InputSignal<ButtonType> = input<ButtonType>('button');
}
