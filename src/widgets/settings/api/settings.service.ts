import type { Signal, WritableSignal } from '@angular/core';
import { Injectable, signal } from '@angular/core';

import type { Page } from '@/shared';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly _settings: WritableSignal<Page[]> = signal([]);

  public readonly settings: Signal<Page[]> = this._settings.asReadonly();

  public setSettingsMenu(settings: Page[]): void {
    this._settings.set(settings);
  }
}
