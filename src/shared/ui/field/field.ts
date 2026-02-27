import type { InputSignal, Signal } from '@angular/core';
import { Component, computed, input } from '@angular/core';
import type { FormControl } from '@angular/forms';

import type { Field as FieldType } from '../../models';
import { Error } from '../error/error';
import { Input } from '../input/input';
import { Label } from '../label/label';

@Component({
  selector: 'app-field',
  templateUrl: './field.html',
  styleUrl: './field.scss',
  imports: [Input, Label, Error],
})
export class Field {
  public readonly field: InputSignal<FieldType> = input.required<FieldType>();
  public readonly control: InputSignal<FormControl> = input.required<FormControl>();

  protected errors: Signal<string[] | null> = computed<string[] | null>((): string[] | null => {
    const control: FormControl = this.control();
    return control.errors ? Object.values(control.errors) : null;
  });
}
