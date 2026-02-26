import { inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import type { GenericSchema } from 'valibot';

import type { Field } from '../../models';

export abstract class AbstractFormComponent<T> {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  protected abstract getFields(): Field[];
  protected abstract getSchema(): GenericSchema<T>;
  protected abstract isLoading(): boolean;
}
