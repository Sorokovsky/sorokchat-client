import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {type Page} from '@/types';
import {SIDEBAR_BOTTOM_MENU, SIDEBAR_TOP_MENU} from '@/constants/sidebar-menu.constants';
import {SidebarMenu} from '@/components/common/sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, SidebarMenu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.sass',
})
export class Sidebar {
  protected readonly TOP_MENU: Page[] = SIDEBAR_TOP_MENU;
  protected readonly BOTTOM_MENU: Page[] = SIDEBAR_BOTTOM_MENU;
}
