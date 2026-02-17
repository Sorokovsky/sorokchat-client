import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import type { Observable } from 'rxjs';
import { filter } from 'rxjs';
import { map } from 'rxjs/operators';

import { EmptyMessage } from '@/shared';

@Component({
  selector: 'app-settings-page',
  imports: [EmptyMessage, AsyncPipe, RouterOutlet],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected hasChild$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((): boolean => !!this.route.firstChild),
  );
}
