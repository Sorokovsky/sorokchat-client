import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  imports: [],
  templateUrl: './field-error.html',
  styleUrl: './field-error.scss',
})
export class FieldError {
  public readonly error: InputSignal<string | null> = input.required<string | null>();
}
