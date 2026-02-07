import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {injectAuthenticationGuard} from '@/widgets';

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
