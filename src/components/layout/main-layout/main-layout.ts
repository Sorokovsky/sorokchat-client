import {Component} from '@angular/core';
import {HeaderComponent} from '@/components/common/header/header.component';
import {RouterOutlet} from '@angular/router';
import {injectAuthenticationGuard} from '@/injections/authentication.guard';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.sass',
})
export class MainLayout {
  constructor() {
    injectAuthenticationGuard();
  }
}
