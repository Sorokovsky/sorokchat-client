import type { InputSignal, InputSignalWithTransform } from '@angular/core';
import { Component, input } from '@angular/core';
import type { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import type { Autocomplete, InputType } from '../../models';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './ui-input.html',
  styleUrl: './ui-input.scss',
})
export class UIInput {
  public readonly type: InputSignal<InputType> = input.required<InputType>();
  public readonly placeholder: InputSignalWithTransform<string, string | undefined> = input<
    string,
    string | undefined
  >('', {
    transform: (value: string | undefined): string => (value === undefined ? '' : value),
  });
  public readonly name: InputSignal<string> = input.required<string>();
  public readonly autocomplete: InputSignal<Autocomplete> = input.required<Autocomplete>();
  public readonly control: InputSignal<FormControl> = input.required<FormControl>();
  public readonly defaultValue: InputSignalWithTransform<string, string | undefined> = input<
    string,
    string | undefined
  >('', {
    transform: (value: string | undefined): string => (value === undefined ? '' : value),
  });
}
