import {Component, computed, type Signal, type Type} from '@angular/core';
import {SIDEBAR_BAR_MAP} from '@/widgets/sidebar/model/bar-map.constants';
import {NgComponentOutlet} from '@angular/common';
import {injectCurrentPath} from '@/injections/utils/current-path.injection';

@Component({
  selector: 'app-right-sidebar',
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './right-sidebar.html',
  styleUrl: './right-sidebar.sass',
})
export class RightSidebar {
  private readonly mappings: Record<string, Type<unknown>> = SIDEBAR_BAR_MAP;
  private readonly currentPathSegment: Signal<string> = injectCurrentPath();

  protected readonly barComponent: Signal<Type<unknown>> = computed((): Type<unknown> => {
    const path: string = this.currentPathSegment();
    const key: string = path.split('/').filter(Boolean)[0];
    return this.mappings[key];
  });
}
