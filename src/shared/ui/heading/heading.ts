import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { HeadingTag } from '../../models';

@Component({
  selector: 'app-heading',
  imports: [],
  templateUrl: './heading.html',
  styleUrl: './heading.scss',
})
export class Heading {
  public readonly tag: InputSignal<HeadingTag> = input<HeadingTag>('h1');
  public readonly text: InputSignal<string> = input.required<string>();
}
