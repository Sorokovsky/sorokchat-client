import {Component, input, type InputSignal, type Signal} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {type Page} from '@/types';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import {removeDynamicRoute} from '@/utils/replace-dynamic-route.util';

@Component({
  selector: 'app-sidebar-menu',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.sass',
})
export class SidebarMenu {
  public readonly menu: InputSignal<Page[]> = input.required<Page[]>();
  private readonly url: Signal<string>;

  constructor(private readonly router: Router) {
    this.url = toSignal(
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((): string => this.router.url)
      ),
      {initialValue: router.url}
    );
  }

  public isActive(page: Page): boolean {
    const currentUrl: string = this.url();
    const currentPath: string = currentUrl.replace(/^\//, "");
    return currentPath.includes(removeDynamicRoute(page.path));
  }

  public getPath(page: Page): string {
    return removeDynamicRoute(page.path);
  }
}
