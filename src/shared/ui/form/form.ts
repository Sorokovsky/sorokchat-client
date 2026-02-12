import type { InputSignal, OutputEmitterRef, Signal } from '@angular/core';
import { Component, computed, inject, input, output } from '@angular/core';
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
  public readonly send: OutputEmitterRef<unknown> = output<unknown>();
  public form: Signal<FormGroup> = computed((): FormGroup => {
    return this.builder.group(this.collectInputs(this.fields()), {
      validators: [zodValidation(this.schema())],
    });
  });

  public onSubmit(): void {
    const form: FormGroup = this.form();
    if (form.valid) this.send.emit(form.value as unknown);
    else form.markAllAsTouched();
  }

  private collectInputs(fields: Field[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const field of fields) {
      result[field.name] = [field.defaultValue || ''];
    }
    return result;
  }
}
