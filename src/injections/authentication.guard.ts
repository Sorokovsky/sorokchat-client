import {NavigationEnd, Router} from '@angular/router';
import {effect, EffectRef, inject, Signal} from '@angular/core';
import {CreateQueryResult} from '@tanstack/angular-query-experimental';
import {User} from '@/contracts/user.contrcact';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {injectProfileQuery} from '@/injections/profile.query';
import {ALL_PAGES, LOGIN_PAGE, Page} from '@/constants/pages.constants';
import {filter, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {hasAccess} from '@/utils/has-access.util';
import {injectIsAuthenticated} from '@/injections/is-authenticated.injection';

export function injectAuthenticationGuard(): EffectRef {
  const router: Router = inject(Router);
  const profile: CreateQueryResult<User, ProblemDetail> = injectProfileQuery();
  const isAuthenticated: Signal<boolean> = injectIsAuthenticated();

  const urlSignal: Signal<string> = toSignal(
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((): string => router.url)
    ),
    {initialValue: router.url}
  );

  return effect((): void => {
    const currentUrl: string = urlSignal();
    const user: User | undefined = profile.data();
    const currentPath: string = currentUrl.replace(/^\//, "");
    const page: Page | undefined = ALL_PAGES.find((page: Page): boolean => page.path === currentPath);
    if (page === undefined) return;
    const haveAccess: boolean = hasAccess(page, user);
    const path: string[] = ["/"];
    if (!isAuthenticated()) path.push(LOGIN_PAGE.path);
    if (!haveAccess) {
      router.navigate(path);
    }
  });
}
