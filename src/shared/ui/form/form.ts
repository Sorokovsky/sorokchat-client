import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { Field } from '../../models';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  public readonly fields: InputSignal<Field[]> = input.required<Field[]>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly submitText: InputSignal<string> = input.required<string>();
}
