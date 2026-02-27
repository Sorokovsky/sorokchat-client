import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {
  public readonly error: InputSignal<string> = input.required<string>();
}
