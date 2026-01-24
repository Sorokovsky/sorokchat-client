import {Component} from '@angular/core';
import {injectProfileQuery} from '@/injections/profile.query';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.sass',
})
export class Header {
  protected readonly profileQuery: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();
}
