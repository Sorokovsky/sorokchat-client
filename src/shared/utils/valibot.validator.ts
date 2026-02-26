import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import type { BaseIssue, GenericSchema, SafeParseResult } from 'valibot';
import { safeParse } from 'valibot';

export function valibotValidator<T>(schema: GenericSchema<T>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result: SafeParseResult<GenericSchema<T>> = safeParse(schema, control.value);
    if (result.success) return null;
    const errors: Record<string, string | Record<string, string>> = {};
    result.issues.forEach((issue: BaseIssue<unknown>) => {
      const errorCode = issue.type || 'valibot';
      if (issue.path && issue.path.length > 0) {
        const fieldName = String(issue.path[0].key);
        if (!errors[fieldName]) {
          errors[fieldName] = {};
        }
        (errors[fieldName] as Record<string, string>)[errorCode] = issue.message;
      } else {
        errors[errorCode] = issue.message;
      }
    });
    return Object.keys(errors).length > 0 ? errors : null;
  };
}
