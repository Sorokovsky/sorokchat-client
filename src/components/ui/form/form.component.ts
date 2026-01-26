import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {Form} from '@/components/ui/form/form.types';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {zodValidator} from '@/validators/zod.validator';

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
  public readonly form: InputSignal<Form<T>> = input.required<Form<T>>();
  protected formGroup: Signal<FormGroup> = computed(() => this.buildForm());

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public buildForm(): FormGroup {
    const controlsNames: string[] = [];
    this.form().fields.forEach(field => controlsNames.push(field.name));
    const controls: Record<string, [string]> = {};
    controlsNames.forEach((controlName: string): void => {
      controls[controlName] = [''];
    })
    return this.formBuilder.group(controls, {
      validators: zodValidator(this.form().zodSchema),
      updateOn: "change"
    });
  }

  public getError(name: string): string {
    return this.formGroup().errors![name];
  }

  protected onSubmit(): void {
    if (this.formGroup().valid) {
      this.form().onSubmit(this.formGroup().value);
    } else {
      this.formGroup().markAllAsTouched();
    }
  }
}
