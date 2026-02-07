import {Router} from '@angular/router';
import {effect, type EffectRef, inject, type Signal} from '@angular/core';
import {injectProfileQuery, type ProfileQuery, type User} from '@/entity';
import {ALL_PAGES} from '@/app/routes';
import {getDefaultPageByAccess, hasAccess, injectCurrentPath, type Page, removeDynamicRoute} from '@/shared';

export function injectAuthenticationGuard(): EffectRef {
  const router: Router = inject(Router);
  const profile: ProfileQuery = injectProfileQuery();
  const urlSignal: Signal<string> = injectCurrentPath();

  return effect((): void => {
    if (profile.isLoading()) return;
    const currentUrl: string = urlSignal();
    const user: User | undefined = profile.data();
    const currentPath: string = currentUrl.replace(/^\//, "");
    const page: Page | undefined = ALL_PAGES
      .find((page: Page): boolean => currentPath.includes(removeDynamicRoute(page.path)));
    if (page === undefined) return;
    const haveAccess: boolean = hasAccess(page, user);
    if (haveAccess) return;
    const path: string[] = ["/"];
    const defaultPage: Page = getDefaultPageByAccess(page.accessRule);
    path.push(defaultPage.path);
    router.navigate(path)
  });
}
