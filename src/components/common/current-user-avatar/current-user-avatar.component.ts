import {Component} from '@angular/core';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {User} from '@/contracts/user.contrcact';
import {injectProfileQuery} from '@/injections/profile.query';
import {AvatarComponent} from '@/components/ui/avatar/avatar.component';

@Component({
  selector: 'app-current-user-avatar',
  imports: [
    AvatarComponent
  ],
  templateUrl: './current-user-avatar.component.html',
  styleUrl: './current-user-avatar.component.sass',
})
export class CurrentUserAvatarComponent {
  protected readonly profile: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();
}
