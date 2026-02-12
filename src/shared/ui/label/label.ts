import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.html',
  styleUrl: './label.scss',
})
export class Label {
  public readonly inputId: InputSignal<string> = input.required<string>();
}
