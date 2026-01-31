import {Component, Signal} from '@angular/core';
import {HeaderComponent} from '@/components/common/header/header.component';
import {RouterOutlet} from '@angular/router';
import {injectAuthenticationGuard} from '@/injections/authentication.guard';
import {injectProfileQuery, ProfileQuery} from '@/injections/profile.query';
import {PageLoaderComponent} from '@/components/ui/page-loader/page-loader.component';
import {ChatsSidebarComponent} from '@/components/common/chats-sidebar/chats-sidebar.component';
import {injectIsAuthenticated} from '@/injections/is-authenticated.injection';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    RouterOutlet,
    PageLoaderComponent,
    ChatsSidebarComponent,
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
