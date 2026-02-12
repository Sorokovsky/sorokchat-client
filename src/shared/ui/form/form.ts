import type { InputSignal, OnInit, OutputEmitterRef, Signal, WritableSignal } from '@angular/core';
import { Component, computed, inject, input, output, signal } from '@angular/core';
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
export class Form<T> implements OnInit {
  private readonly builder: FormBuilder = inject(FormBuilder);
  private readonly isInvalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly fields: InputSignal<Field[]> = input.required<Field[]>();
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly submitText: InputSignal<string> = input.required<string>();
  public readonly schema: InputSignal<zod.ZodSchema<T>> = input.required<zod.ZodSchema<T>>();
  public readonly isLoading: InputSignal<boolean> = input<boolean>(false);
  public readonly send: OutputEmitterRef<T> = output<T>();
  public form: Signal<FormGroup> = computed((): FormGroup => {
    return this.builder.group(this.collectInputs(this.fields()), {
      validators: [zodValidation(this.schema())],
    });
  });

  protected readonly isDisabled: Signal<boolean> = computed((): boolean => {
    return this.isLoading() || this.isInvalid();
  });

  public ngOnInit(): void {
    const form: FormGroup = this.form();
    form.valueChanges.subscribe((): void => {
      this.isInvalid.set(form.invalid);
    });
    this.isInvalid.set(form.invalid);
  }

  public onSubmit(): void {
    const form: FormGroup = this.form();
    if (form.valid) this.send.emit(form.value);
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
