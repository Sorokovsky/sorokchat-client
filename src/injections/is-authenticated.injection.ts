import {computed, Signal} from '@angular/core';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {injectProfileQuery} from '@/injections/profile.query';

export function injectIsAuthenticated(): Signal<boolean> {
  const profile: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();
  return computed((): boolean => profile.data() !== undefined);
}
