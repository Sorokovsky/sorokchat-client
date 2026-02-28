import { Component } from '@angular/core';

import { LEFT_BOTTOM_MENU, LEFT_TOP_MENU } from '../../data';
import type { LeftMenuItem } from '../../models';
import { LeftMenu } from '../left-menu/left-menu';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss',
  imports: [LeftMenu],
})
export class LeftSidebar {
  protected readonly topMenu: LeftMenuItem[] = LEFT_TOP_MENU;
  protected readonly bottomMenu: LeftMenuItem[] = LEFT_BOTTOM_MENU;
}
