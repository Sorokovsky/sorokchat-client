import {Component, effect} from '@angular/core';
import {HeaderComponent} from '@/components/common/header/header.component';
import {Router, RouterOutlet} from '@angular/router';
import {injectProfileQuery} from '@/injections/profile.query';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {ANONYMOUS_PAGES, LOGIN_PAGE, SECURED_PAGES} from '@/constants/pages.constants';
import {Location} from '@angular/common';
import {isContainsPage} from '@/utils/contains-page.util';

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
  private readonly profile: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();

  constructor(private readonly router: Router, private readonly location: Location) {
    effect((): void => {
      const currentPath: string = location.path().replace("/", "");
      const isSecured: boolean = isContainsPage(SECURED_PAGES, currentPath);
      const isAnonymousPage: boolean = isContainsPage(ANONYMOUS_PAGES, currentPath);
      const isAuthenticated: boolean = this.profile.data() !== undefined;
      if (isAuthenticated && isAnonymousPage) {
        this.router.navigate(["/"])
      }
      if (!isAuthenticated && isSecured) {
        this.router.navigate(["/", LOGIN_PAGE.path]);
      }
    });
  }
}
