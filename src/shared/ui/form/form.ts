import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import type { GenericSchema } from 'valibot';

import type { Field } from '../../models';
import { Button } from '../button/button';
import { Field as FieldComponent } from '../field/field';
import { AbstractFormComponent } from './abstract-form';

@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  styleUrls: ['./form.scss'],
  imports: [ReactiveFormsModule, Button, FieldComponent],
})
export class FormComponent<T> extends AbstractFormComponent<T> {
  public readonly formTitle: InputSignal<string> = input.required<string>();
  public readonly fields: InputSignal<Field[]> = input.required<Field[]>();
  public readonly submitText: InputSignal<string> = input.required<string>();
  public readonly schema: InputSignal<GenericSchema<T>> = input.required<GenericSchema<T>>();
  public readonly isLoading: InputSignal<boolean> = input(false);

  protected override getFields(): Field[] {
    return this.fields();
  }

  protected override getSchema(): GenericSchema<T> {
    return this.schema();
  }
}
