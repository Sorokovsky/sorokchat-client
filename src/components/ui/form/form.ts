import {Component, computed, input, type InputSignal, output, type OutputEmitterRef, type Signal} from '@angular/core';
import {type Field} from '@/components/ui/form/form.contract';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import {z as zod} from "zod";
import {zodValidator} from '@/validators/zod.validator';

type Controls = Record<string, string[]>;

@Component({
  selector: 'app-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.sass',
})
export class Form {
  public fields: InputSignal<Field[]> = input.required<Field[]>();
  public title: InputSignal<string> = input.required<string>();
  public submitText: InputSignal<string> = input.required<string>();
  public schema: InputSignal<zod.Schema> = input.required<zod.Schema>();
  public onSubmit: OutputEmitterRef<unknown> = output<unknown>();
  protected readonly form: Signal<FormGroup> = computed((): FormGroup => {
    return this.formBuilder.group(this.collectControls(), {validators: [zodValidator(this.schema())]});
  });

  constructor(private readonly formBuilder: FormBuilder) {
  }

  protected onSend(): void {
    const formGroup: FormGroup = this.form();
    formGroup.markAllAsTouched();
    if (formGroup.valid) {
      this.onSubmit.emit(formGroup);
    }
  }

  protected getErrors(name: string): string[] {
    const errors: ValidationErrors | null = this.form().errors;
    if (errors === null) return [];
    return [errors[name]];
  }

  private collectControls(): Controls {
    const controls: Controls = {};
    for (const field of this.fields()) {
      controls[field.name] = [field.defaultValue || ""];
    }
    return controls;
  }
}
