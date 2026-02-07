import {Component} from '@angular/core';
import {LeftSidebar} from '@/widgets/sidebar/ui/left-sidebar/left-sidebar';
import {RightSidebar} from '@/widgets/sidebar/ui/right-sidebar/right-sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [LeftSidebar, RightSidebar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.sass',
})
export class Sidebar {

}
