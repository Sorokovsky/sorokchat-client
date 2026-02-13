import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import type { Mappings, Page } from '@/shared';
import { Sidebar } from '@/widgets';

import { BOTTOM_LEFT_MENU, MAPPINGS, TOP_LEFT_MENU } from '../../data';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  protected readonly topLeftMenu: Page[] = TOP_LEFT_MENU;
  protected readonly bottomLeftMenu: Page[] = BOTTOM_LEFT_MENU;
  protected readonly mappings: Mappings = MAPPINGS;
}
