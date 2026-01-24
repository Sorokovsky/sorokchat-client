import {Component} from '@angular/core';
import {Header} from '@/components/common/header/header';

@Component({
  selector: 'app-main-layout',
  imports: [
    Header
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.sass',
})
export class MainLayout {

}
