import type { ModelSignal, OnDestroy, OnInit } from '@angular/core';
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
export class ToggleSidebar implements OnInit, OnDestroy {
  private static COUNT: number = 0;

  public isActive: ModelSignal<boolean> = model.required<boolean>();

  public ngOnInit(): void {
    ToggleSidebar.COUNT++;
    if (ToggleSidebar.COUNT > 0) {
      document.addEventListener('click', this.closeIfNotIcon.bind(this));
    }
  }

  public ngOnDestroy(): void {
    ToggleSidebar.COUNT--;
    if (ToggleSidebar.COUNT < 1) {
      document.removeEventListener('click', this.closeIfNotIcon.bind(this));
    }
  }

  protected icon: IconType = MenuIcon;

  protected toggle(): void {
    this.isActive.update((previous: boolean): boolean => !previous);
  }

  private closeIfNotIcon(event: PointerEvent): void {
    const { target } = event;
    if (!(target instanceof HTMLElement)) return;
    const isNotToggler: boolean = target.closest('.toggle-button') === null;
    const isNotLeftSidebar: boolean = target.closest('.left-sidebar') === null;
    const isNotPopupContent: boolean = target.closest('.popup__content') === null;
    if (isNotToggler && isNotLeftSidebar && isNotPopupContent) this.isActive.set(false);
  }
}
