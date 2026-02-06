import {Component} from '@angular/core';
import {LeftSidebar} from '@/components/common/left-sidebar/left-sidebar';
import {RightSidebar} from '@/components/common/right-sidebar/right-sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [LeftSidebar, RightSidebar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.sass',
})
export class Sidebar {

}
