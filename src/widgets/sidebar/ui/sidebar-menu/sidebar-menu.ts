import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { Page } from '@/shared';

@Component({
  selector: 'app-sidebar-menu',
  imports: [],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  public readonly menu: InputSignal<Page[]> = input.required<Page[]>();
}
