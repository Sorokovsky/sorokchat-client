import type { InputSignal, Signal } from '@angular/core';
import { Component, computed, inject, input } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import type { z as zod } from 'zod';

import { zodValidation } from '@/shared';

import type { Field } from '../../models';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  private readonly builder: FormBuilder = inject(FormBuilder);
  public readonly fields: InputSignal<Field[]> = input.required<Field[]>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly submitText: InputSignal<string> = input.required<string>();
  public readonly schema: InputSignal<zod.Schema> = input.required<zod.Schema>();
  public form: Signal<FormGroup> = computed((): FormGroup => {
    return this.builder.group(this.collectInputs(this.fields()), {
      validators: [zodValidation(this.schema())],
    });
  });

  private collectInputs(fields: Field[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const field of fields) {
      result[field.name] = [field.defaultValue || ''];
    }
    return result;
  }
}
