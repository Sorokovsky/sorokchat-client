import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {injectProfileQuery} from '@/injections/profile.query';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {ANONYMOUS_PAGES, Page, SECURED_PAGES} from '@/constants/pages.constants';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  private readonly profile: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();

  public getPages(): Page[] {
    return this.profile.data() ? SECURED_PAGES : ANONYMOUS_PAGES;
  }
}
