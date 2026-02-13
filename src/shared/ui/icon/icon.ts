import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import type { IconType } from '../../models';

@Component({
  selector: 'app-icon',
  imports: [LucideAngularModule],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  public readonly icon: InputSignal<IconType> = input.required<IconType>();
}
