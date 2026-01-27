import {Component, OnInit} from '@angular/core';
import {injectLogoutMutation} from '@/injections/logout.mutation';
import {CreateMutationResult} from '@tanstack/angular-query-experimental';
import {ProblemDetail} from '@/contracts/problem-detail.contract';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.page.html',
  styleUrl: './logout.page.sass',
})
export class LogoutPage implements OnInit {
  private readonly logoutMutation: CreateMutationResult<void, ProblemDetail, void, void> = injectLogoutMutation();

  ngOnInit(): void {
    this.logoutMutation.mutate();
  }

}
