import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {injectAuthenticationGuard} from '@/injections/authorization/authentication.guard';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './root.html',
  styleUrl: './root.sass',
})
export class Root {
  constructor() {
    injectAuthenticationGuard();
  }
}
