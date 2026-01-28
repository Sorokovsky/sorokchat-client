import {Component} from '@angular/core';
import {HeaderComponent} from '@/components/common/header/header.component';
import {RouterOutlet} from '@angular/router';
import {injectAuthenticationGuard} from '@/injections/authentication.guard';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {injectProfileQuery} from '@/injections/profile.query';
import {PageLoaderComponent} from '@/components/ui/page-loader/page-loader.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    RouterOutlet,
    PageLoaderComponent
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.sass',
})
export class MainLayout {
  protected readonly profile: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();

  constructor() {
    injectAuthenticationGuard();
  }
}
