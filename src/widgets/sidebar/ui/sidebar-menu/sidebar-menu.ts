import type { InputSignal, Signal } from '@angular/core';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import type { Page } from '@/shared';
import { ActionIcon, injectCurrentPath, removeDynamicPath } from '@/shared';

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink, RouterLinkActive, ActionIcon],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  public readonly menu: InputSignal<Page[]> = input.required<Page[]>();
  public readonly currentPath: Signal<string> = injectCurrentPath();

  protected getLink(item: Page): string {
    return removeDynamicPath(item.path);
  }

  protected isActive(item: Page): boolean {
    return this.getLink(item) === this.currentPath();
  }
}
