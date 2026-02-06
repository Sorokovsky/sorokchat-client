import {Component} from '@angular/core';
import {SidebarMenu} from "@/components/common/sidebar-menu/sidebar-menu";
import {SIDEBAR_BOTTOM_MENU, SIDEBAR_TOP_MENU} from '@/constants/sidebar-menu.constants';
import {type Page} from '@/types';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-left-sidebar',
  imports: [SidebarMenu, LucideAngularModule],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.sass',
})
export class LeftSidebar {
  protected readonly TOP_MENU: Page[] = SIDEBAR_TOP_MENU;
  protected readonly BOTTOM_MENU: Page[] = SIDEBAR_BOTTOM_MENU;
}
