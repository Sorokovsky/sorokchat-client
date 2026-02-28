import { Component } from '@angular/core';

import { LeftSidebar } from '../left-sidebar/left-sidebar';
import { RightSidebar } from '../right-sidebar/right-sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  imports: [LeftSidebar, RightSidebar],
})
export class Sidebar {}
