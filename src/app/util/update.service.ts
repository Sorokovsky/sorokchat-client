import { inject, Injectable } from '@angular/core';
import type { VersionEvent, VersionReadyEvent } from '@angular/service-worker';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private readonly updater: SwUpdate = inject(SwUpdate);

  constructor() {
    if (!this.updater.isEnabled) return;
    setInterval((): Promise<boolean> => this.updater.checkForUpdate(), 1000);
    this.updater.versionUpdates
      .pipe(
        filter((event: VersionEvent): event is VersionReadyEvent => event.type === 'VERSION_READY'),
      )
      .subscribe((): void => {
        const mustUpdateNow: boolean = confirm('Доступна нова версія додатка. Оновити зараз?');
        if (mustUpdateNow) {
          this.updater.activateUpdate().then((): void => document.location.reload());
        }
      });
  }
}
