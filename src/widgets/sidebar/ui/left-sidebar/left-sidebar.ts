import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import type { Page } from '@/shared';

import { SidebarMenu } from '../sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-left-sidebar',
  imports: [SidebarMenu],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss',
})
export class LeftSidebar {
  public readonly topMenu: InputSignal<Page[]> = input.required<Page[]>();
  public readonly bottomMenu: InputSignal<Page[]> = input.required<Page[]>();
}
