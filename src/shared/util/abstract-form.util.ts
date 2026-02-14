import type { OnInit, OutputEmitterRef, Signal, WritableSignal } from '@angular/core';
import { Component, computed, inject, output, signal } from '@angular/core';
import type { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import type { z as zod } from "zod";

import type { Field } from '../models';
import { zodValidation } from './zod.validation';

@Component({
  template: ''
})
export abstract class AbstractForm<T> implements OnInit {

  public readonly send: OutputEmitterRef<T> = output<T>();

  protected onSubmit(): void {
    const form: FormGroup = this.form();
    if (form.valid) this.send.emit(form.value as T);
    else form.markAllAsTouched();
  }

  public getError(name: string): string | null {
    const errors: ValidationErrors | null = this.form().errors;
    if (errors === null) return null;
    if (name in errors) return errors[name].message;
    return null;
  }

  public getControl(name: string): FormControl {
    return this.form().get(name) as FormControl;
  }

  public ngOnInit(): void {
    const form: FormGroup = this.form();
    form.valueChanges.subscribe((): void => {
      this.isInvalid.set(form.invalid);
    });
    this.isInvalid.set(form.invalid);
  }

  private readonly builder: FormBuilder = inject(FormBuilder);

  protected abstract getFields(): Signal<Field[]>;

  protected abstract getSchema(): Signal<zod.ZodSchema<T>>;

  protected abstract getIsLoading(): Signal<boolean>;

  protected readonly isInvalid: WritableSignal<boolean> = signal(false);

  protected readonly isDisabled: Signal<boolean> = computed((): boolean => {
    return this.getIsLoading()() || this.isInvalid();
  });


  protected form: Signal<FormGroup> = computed((): FormGroup => {
    return this.builder.group(this.collectInputs(this.getFields()()), {
      validators: [zodValidation(this.getSchema()())],
    });
  });

  protected collectInputs(fields: Field[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const field of fields) {
      result[field.name] = [field.defaultValue || ''];
    }
    return result;
  }
};
