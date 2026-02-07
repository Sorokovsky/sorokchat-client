import {z as zod, type ZodSafeParseResult} from 'zod';
import {type AbstractControl, type ValidationErrors, type ValidatorFn} from '@angular/forms';

export function zodValidator(schema: zod.Schema): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result: ZodSafeParseResult<unknown> = schema.safeParse(control.value);
    if (result.success) return null;
    const errors: ValidationErrors = {};
    result.error.issues.forEach((issue): void => {
      const path: string = issue.path.join('.') || "zodError";
      errors[path] = issue.message;
    });
    return errors;
  }
}
