import {Component, type Signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {injectAuthenticationGuard} from '@/injections/authentication.guard';
import {injectProfileQuery, type ProfileQuery} from '@/injections/profile.query';
import {injectIsAuthenticated} from '@/injections/is-authenticated.injection';
import {Sidebar} from '@/components/common/sidebar/sidebar';

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
  protected readonly profile: ProfileQuery = injectProfileQuery();
  protected readonly isAuthenticated: Signal<boolean> = injectIsAuthenticated();

  constructor() {
    injectAuthenticationGuard();
  }
}
