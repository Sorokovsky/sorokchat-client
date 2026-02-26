import { inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import type { Field } from '../../models';

export abstract class AbstractFormComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  protected abstract getFields(): Field[];
}
