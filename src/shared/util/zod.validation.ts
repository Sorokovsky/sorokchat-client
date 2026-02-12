import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import type { z as zod, ZodSafeParseResult } from 'zod';
import type { $ZodIssue } from 'zod/v4/core';

export function zodValidation<T>(schema: zod.ZodSchema<T>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result: ZodSafeParseResult<unknown> = schema.safeParse(control.value);
    if (result.success) return null;
    const errors: ValidationErrors = {};
    result.error.issues.forEach((issue: $ZodIssue): void => {
      const key: string = issue.path.join('.');
      errors[key] = { message: issue.message };
    });
    return errors;
  };
}
