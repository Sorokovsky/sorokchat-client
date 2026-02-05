import {Component, computed, input, type InputSignal, output, type OutputEmitterRef, type Signal} from '@angular/core';
import {type Field} from '@/components/ui/form/form.contract';
import {FormBuilder, FormGroup} from '@angular/forms';
import {z as zod} from "zod";
import {zodValidator} from '@/validators/zod.validator';

type Controlls = Record<string, string[]>;

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.sass',
})
export class Form {
  public fields: InputSignal<Field[]> = input.required<Field[]>();
  public title: InputSignal<string> = input.required<string>();
  public submitText: InputSignal<string> = input.required<string>();
  public schema: InputSignal<zod.Schema> = input.required<zod.Schema>();
  public onSubmit: OutputEmitterRef<unknown> = output<unknown>();
  private readonly form: Signal<FormGroup> = computed((): FormGroup => {
    return this.formBuilder.group(this.collectControls(), {validators: [zodValidator(this.schema())]});
  });

  constructor(private readonly formBuilder: FormBuilder) {
  }

  private onSend(): void {
    const formGroup: FormGroup = this.form();
    formGroup.markAllAsTouched();
    if (formGroup.valid) {
      this.onSubmit.emit(formGroup);
    }
  }

  private collectControls(): Controlls {
    const controls: Controlls = {};
    for (const field of this.fields()) {
      controls[field.name] = [field.defaultValue || ""];
    }
    return controls;
  }
}
