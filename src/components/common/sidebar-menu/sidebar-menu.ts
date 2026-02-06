import {Component, input, type InputSignal, type Signal} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {RouterLink} from '@angular/router';
import {type Page} from '@/types';
import {removeDynamicRoute} from '@/utils/replace-dynamic-route.util';
import {injectCurrentPath} from '@/injections/current-path.injection';

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
  private readonly path: Signal<string> = injectCurrentPath();

  public isActive(page: Page): boolean {
    return this.path().includes(removeDynamicRoute(page.path));
  }

  public getPath(page: Page): string {
    return removeDynamicRoute(page.path);
  }
}
