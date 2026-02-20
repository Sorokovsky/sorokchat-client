import type { InputSignal, WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { input } from '@angular/core';
import { Component } from '@angular/core';

import type { Mappings, Page } from '@/shared';

import { LeftSidebar } from '../left-sidebar/left-sidebar';
import { RightSidebar } from '../right-sidebar/right-sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [LeftSidebar, RightSidebar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  public readonly topLeftMenu: InputSignal<Page[]> = input.required<Page[]>();
  public readonly bottomLeftMenu: InputSignal<Page[]> = input.required<Page[]>();
  public readonly mappings: InputSignal<Mappings> = input.required<Mappings>();
  protected readonly isRightOpen: WritableSignal<boolean> = signal<boolean>(false);
}
