import {Component, computed, input, InputSignal, output, OutputEmitterRef, Signal} from '@angular/core';
import {Field} from '@/components/ui/form/form.types';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {zodValidator} from '@/validators/zod.validator';
import {z as zod} from 'zod';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.sass',
})
export class FormComponent<T> {
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly fields: InputSignal<Field[]> = input.required<Field[]>();
  public readonly schema: InputSignal<zod.Schema> = input.required<zod.Schema>();
  public readonly submitText: InputSignal<string> = input.required<string>();
  public readonly onSend: OutputEmitterRef<T> = output<T>();

  protected formGroup: Signal<FormGroup> = computed(() => this.buildForm());

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public buildForm(): FormGroup {
    const controlsNames: string[] = [];
    this.fields().forEach(field => controlsNames.push(field.name));
    const controls: Record<string, [string]> = {};
    controlsNames.forEach((controlName: string): void => {
      controls[controlName] = [''];
    })
    return this.formBuilder.group(controls, {
      validators: zodValidator(this.schema()),
      updateOn: "change"
    });
  }

  public getError(name: string): string {
    return this.formGroup().errors![name];
  }

  protected handler(): void {
    if (this.formGroup().valid) {
      this.onSend.emit(this.formGroup().value);
    } else {
      this.formGroup().markAllAsTouched();
    }
  }
}
