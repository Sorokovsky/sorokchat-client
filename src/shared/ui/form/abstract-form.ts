import type { OnInit, OutputEmitterRef, Signal, WritableSignal } from '@angular/core';
import { Component, computed, inject, output, signal } from '@angular/core';
import type { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import type { GenericSchema, ObjectEntries } from 'valibot';

import type { Field } from '../../models';
import { valibotValidator } from '../../utils';

@Component({
  template: '',
})
export abstract class AbstractFormComponent<T> implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  protected abstract getFields(): Field[];
  protected abstract getSchema(): GenericSchema<T>;
  protected abstract isLoading(): boolean;
  protected readonly isInvalid: WritableSignal<boolean> = signal<boolean>(false);
  public readonly send: OutputEmitterRef<T> = output<T>();

  protected readonly formGroup: Signal<FormGroup> = computed<FormGroup>((): FormGroup => {
    return this.formBuilder.group(this.collectControls(this.getFields()), {
      validators: [valibotValidator(this.getSchema())],
    });
  });

  public ngOnInit(): void {
    const form: FormGroup = this.formGroup();
    form.valueChanges.subscribe((): void => {
      this.isInvalid.set(form.invalid);
    });
    this.isInvalid.set(form.invalid);
  }

  public onSubmit(): void {
    const form: FormGroup = this.formGroup();
    if (form.valid) this.send.emit(form.value as T);
    form.markAllAsTouched();
  }

  protected getControl(name: string): FormControl {
    return this.formGroup().get(name) as FormControl;
  }

  private collectControls(fields: Field[]): Record<string, FormControl> {
    const result: Record<string, FormControl> = {};
    const schema: GenericSchema<T> = this.getSchema();

    let entries: ObjectEntries = {};
    if ('entries' in schema) {
      entries = (schema as { entries: ObjectEntries }).entries;
    }

    for (const { defaultValue, name } of fields) {
      const fieldSchema = entries[name];
      result[name] = this.formBuilder.control(defaultValue || '', {
        validators: fieldSchema ? [valibotValidator(fieldSchema)] : [],
      });
    }
    return result;
  }
}
