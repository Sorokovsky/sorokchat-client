import {NavigationEnd, Router} from '@angular/router';
import {effect, EffectRef, inject, Signal} from '@angular/core';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {injectProfileQuery} from '@/injections/profile.query';
import {isContainsPage} from '@/utils/contains-page.util';
import {ANONYMOUS_PAGES, LOGIN_PAGE, SECURED_PAGES} from '@/constants/pages.constants';
import {filter, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

export function injectAuthenticationGuard(): EffectRef {
  const router: Router = inject(Router);
  const profile: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();

  const urlSignal: Signal<string> = toSignal(
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => router.url)
    ),
    {initialValue: router.url}
  );

  return effect(() => {
    const currentUrl = urlSignal();
    const userData: User | undefined = profile.data();

    const currentPath: string = currentUrl.replace(/^\//, "");
    const isSecured: boolean = isContainsPage(SECURED_PAGES, currentPath);
    const isAnonymousPage: boolean = isContainsPage(ANONYMOUS_PAGES, currentPath);
    const isAuthenticated: boolean = userData !== undefined;

    if (isAuthenticated && isAnonymousPage) {
      router.navigate(["/"]);
    }

    if (!isAuthenticated && isSecured) {
      router.navigate(["/", LOGIN_PAGE.path]);
    }
  });
}
