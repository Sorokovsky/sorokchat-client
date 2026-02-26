import type { Signal } from '@angular/core';
import { computed, inject } from '@angular/core';
import type { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import type { GenericSchema } from 'valibot';

import type { Field } from '../../models';

export abstract class AbstractFormComponent<T> {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  protected abstract getFields(): Field[];
  protected abstract getSchema(): GenericSchema<T>;
  protected abstract isLoading(): boolean;

  protected readonly formGroup: Signal<FormGroup> = computed<FormGroup>((): FormGroup => {
    return this.formBuilder.group(this.collectControls(this.getFields()), {
      validators: [],
    });
  });

  protected getControl(name: string): FormControl {
    return this.formGroup().get(name) as FormControl;
  }

  private collectControls(fields: Field[]) {
    const result: Record<string, FormControl> = {};
    for (const { defaultValue, name } of fields) {
      result[name] = this.formBuilder.control(defaultValue ? defaultValue : '');
    }
    return result;
  }
}
