import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';
import type { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import type { Field } from '../../models';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  imports: [ReactiveFormsModule],
})
export class Input {
  public readonly field: InputSignal<Field> = input.required<Field>();
  public readonly control: InputSignal<FormControl> = input.required<FormControl>();
}
