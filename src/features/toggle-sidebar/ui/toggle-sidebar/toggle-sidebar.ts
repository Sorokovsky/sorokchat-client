import type { ModelSignal } from '@angular/core';
import { Component, model } from '@angular/core';
import { MenuIcon } from 'lucide-angular';

import type { IconType } from '@/shared';
import { ActionButton } from '@/shared';

@Component({
  selector: 'app-toggle-sidebar',
  imports: [ActionButton],
  templateUrl: './toggle-sidebar.html',
  styleUrl: './toggle-sidebar.scss',
})
export class ToggleSidebar {
  public isActive: ModelSignal<boolean> = model.required<boolean>();

  protected icon: IconType = MenuIcon;

  protected toggle(): void {
    this.isActive.update((previous: boolean): boolean => !previous);
  }
}
