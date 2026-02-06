import {Component, computed, inject, type Signal, type Type} from '@angular/core';
import {SIDEBAR_BAR_MAP} from '@/constants/bar-map.constants';
import {NavigationEnd, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'app-right-sidebar',
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './right-sidebar.html',
  styleUrl: './right-sidebar.sass',
})
export class RightSidebar {
  protected readonly router: Router = inject(Router);
  private readonly mappings: Record<string, Type<unknown>> = SIDEBAR_BAR_MAP;
  private readonly currentPathSegment: Signal<string> = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((): string => this.router.url)
    ),
    {initialValue: "default"}
  );

  protected readonly barComponent: Signal<Type<unknown>> = computed((): Type<unknown> => {
    const path: string = this.currentPathSegment();
    const key: string = path.split('/').filter(Boolean)[0];
    return this.mappings[key];
  });
}
