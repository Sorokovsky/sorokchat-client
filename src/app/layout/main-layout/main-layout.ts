import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '@/widgets/sidebar/ui/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    Sidebar,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.sass',
})
export class MainLayout {
}
