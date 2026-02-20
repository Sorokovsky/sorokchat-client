import type { InputSignal, ModelSignal } from '@angular/core';
import { model } from '@angular/core';
import { Component, input } from '@angular/core';

import { ToggleSidebar } from '@/features';
import type { Page } from '@/shared';

import { SidebarMenu } from '../sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-left-sidebar',
  imports: [SidebarMenu, ToggleSidebar],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss',
})
export class LeftSidebar {
  public readonly topMenu: InputSignal<Page[]> = input.required<Page[]>();
  public readonly bottomMenu: InputSignal<Page[]> = input.required<Page[]>();
  public readonly isRightOpen: ModelSignal<boolean> = model.required<boolean>();
}
