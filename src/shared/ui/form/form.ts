import type { InputSignal, OutputEmitterRef, Signal } from '@angular/core';
import { Component, computed, inject, input, output } from '@angular/core';
import type { FormGroup, ValidationErrors } from '@angular/forms';
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
export class Form<T> {
  private readonly builder: FormBuilder = inject(FormBuilder);
  public readonly fields: InputSignal<Field[]> = input.required<Field[]>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly submitText: InputSignal<string> = input.required<string>();
  public readonly schema: InputSignal<zod.Schema> = input.required<zod.Schema>();
  public readonly isLoading: InputSignal<boolean> = input<boolean>(false);
  public readonly send: OutputEmitterRef<T> = output<T>();
  public form: Signal<FormGroup> = computed((): FormGroup => {
    return this.builder.group(this.collectInputs(this.fields()), {
      validators: [zodValidation(this.schema())],
    });
  });

  public onSubmit(): void {
    const form: FormGroup = this.form();
    if (form.valid) this.send.emit(form.value as T);
    else form.markAllAsTouched();
  }

  protected getError(name: string): string | null {
    const errors: ValidationErrors | null = this.form().errors;
    if (errors === null) return null;
    if (name in errors) return errors[name].message;
    return null;
  }

  private collectInputs(fields: Field[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const field of fields) {
      result[field.name] = [field.defaultValue || ''];
    }
    return result;
  }
}
