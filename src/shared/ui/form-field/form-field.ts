import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';
import type { FormControl } from '@angular/forms';

import type { Field } from '../../models';
import { FieldError } from '../field-error/field-error';
import { UIInput } from '../input/ui-input';
import { Label } from '../label/label';

@Component({
  selector: 'app-form-field',
  imports: [FieldError, Label, UIInput],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  public readonly field: InputSignal<Field> = input.required<Field>();
  public readonly error: InputSignal<string | null> = input.required<string | null>();
  public readonly control: InputSignal<FormControl> = input.required<FormControl>();
}
