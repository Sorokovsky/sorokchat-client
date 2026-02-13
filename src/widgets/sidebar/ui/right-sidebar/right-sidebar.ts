import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { Mappings } from '@/shared';

@Component({
  selector: 'app-right-sidebar',
  imports: [],
  templateUrl: './right-sidebar.html',
  styleUrl: './right-sidebar.scss',
})
export class RightSidebar {
  public readonly mappings: InputSignal<Mappings> = input.required<Mappings>();
}
