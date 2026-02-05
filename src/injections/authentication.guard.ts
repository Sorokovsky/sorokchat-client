import {NavigationEnd, Router} from '@angular/router';
import {effect, type EffectRef, inject, type Signal} from '@angular/core';
import {type User} from '@/contracts/user.contrcact';
import {injectProfileQuery, type ProfileQuery} from '@/injections/profile.query';
import {ALL_PAGES} from '@/constants/pages.constants';
import {filter, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {hasAccess} from '@/utils/has-access.util';
import {type Page} from '@/types';
import {getDefaultPageByAccess} from '@/utils/get-default-page-by-access';

export function injectAuthenticationGuard(): EffectRef {
  const router: Router = inject(Router);
  const profile: ProfileQuery = injectProfileQuery();
  const urlSignal: Signal<string> = toSignal(
    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((): string => router.url)
    ),
    {initialValue: router.url}
  );

  return effect((): void => {
    if (profile.isLoading()) return;
    const currentUrl: string = urlSignal();
    const user: User | undefined = profile.data();
    const currentPath: string = currentUrl.replace(/^\//, "");
    const page: Page | undefined = ALL_PAGES.find((page: Page): boolean => page.path === currentPath);
    if (page === undefined) return;
    const haveAccess: boolean = hasAccess(page, user);
    if (haveAccess) return;
    const path: string[] = ["/"];
    const defaultPage: Page = getDefaultPageByAccess(page.accessRule);
    path.push(defaultPage.path);
    router.navigate(path)
  });
}
