import type { InputSignal, Signal } from '@angular/core';
import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import type { z as zod } from 'zod';

import type { Field } from '../../models';
import { AbstractForm } from '../../util';
import { Button } from '../button/button';
import { FormField } from '../form-field/form-field';
import { Heading } from '../heading/heading';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, Button, FormField, Heading],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form<T> extends AbstractForm<T> {
  public readonly fields: InputSignal<Field[]> = input.required<Field[]>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly submitText: InputSignal<string> = input.required<string>();
  public readonly schema: InputSignal<zod.ZodSchema<T>> = input.required<zod.ZodSchema<T>>();
  public readonly isLoading: InputSignal<boolean> = input<boolean>(false);

  protected override getFields(): Signal<Field[]> {
    return computed<Field[]>((): Field[] => this.fields());
  }

  protected override getSchema(): Signal<zod.ZodSchema<T>> {
    return computed<zod.ZodSchema<T>>((): zod.ZodSchema<T> => this.schema());
  }


  protected override getIsLoading(): Signal<boolean> {
    return computed<boolean>((): boolean => this.isLoading());
  }
}
