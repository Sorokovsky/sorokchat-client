import {Component} from '@angular/core';
import {HeaderComponent} from '@/components/common/header/header.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.sass',
})
export class MainLayout {

}
