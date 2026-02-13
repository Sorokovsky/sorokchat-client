import { NgComponentOutlet } from '@angular/common';
import type { InputSignal, Signal, Type } from '@angular/core';
import { computed } from '@angular/core';
import { Component, input } from '@angular/core';

import type { Mappings } from '@/shared';
import { injectCurrentPath } from '@/shared';

import { NoBar } from '../no-bar/no-bar';

@Component({
  selector: 'app-right-sidebar',
  imports: [NgComponentOutlet, NoBar],
  templateUrl: './right-sidebar.html',
  styleUrl: './right-sidebar.scss',
})
export class RightSidebar {
  public readonly mappings: InputSignal<Mappings> = input.required<Mappings>();
  protected readonly currentPath: Signal<string> = injectCurrentPath();
  protected readonly key: Signal<string | null> = computed((): string | null => {
    const mappings: Mappings = this.mappings();
    const keys: string[] = Object.keys(mappings);
    const key: string | null =
      keys.find((key: string): boolean => this.currentPath().includes(key)) || null;
    if (key === null) return null;
    return key;
  });

  protected readonly component: Signal<Type<unknown> | null> = computed(
    (): Type<unknown> | null => {
      const mappings: Mappings = this.mappings();
      const key: string | null = this.key();
      if (key === null) return null;
      if (key in mappings) return mappings[key];
      return null;
    },
  );
}
