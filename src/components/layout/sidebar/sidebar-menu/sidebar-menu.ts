import {Component, input, type InputSignal} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {RouterLink, RouterLinkActive} from '@angular/router';
import {type Page} from '@/types';
import {removeDynamicRoute} from '@/shared/utils/replace-dynamic-route.util';

@Component({
  selector: 'app-sidebar-menu',
  imports: [
    LucideAngularModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.sass',
})
export class SidebarMenu {
  public readonly menu: InputSignal<Page[]> = input.required<Page[]>();

  public getPath(page: Page): string {
    return removeDynamicRoute(page.path);
  }
}
