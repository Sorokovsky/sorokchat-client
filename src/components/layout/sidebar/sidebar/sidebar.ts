import {Component} from '@angular/core';
import {LeftSidebar} from '@/components/layout/sidebar/left-sidebar/left-sidebar';
import {RightSidebar} from '@/components/layout/sidebar/right-sidebar/right-sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [LeftSidebar, RightSidebar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.sass',
})
export class Sidebar {

}
