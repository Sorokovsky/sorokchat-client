import type { OnInit, Signal } from '@angular/core';
import { inject } from '@angular/core';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

import type { GetProfileQuery } from '@/entities';
import { injectGetProfile } from '@/entities';
import { Loader } from '@/shared';
import { SettingsService } from '@/widgets';

import { SETTINGS_MENU } from '../../data';
import { injectAuthenticationGuard } from '../../guards';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader, NgxSonnerToaster],
  templateUrl: './root.html',
  styleUrl: './root.scss',
})
export class Root implements OnInit {
  private readonly settingsService: SettingsService = inject(SettingsService);

  private readonly profile: GetProfileQuery = injectGetProfile();
  protected readonly isLoading: Signal<boolean> = computed((): boolean =>
    this.profile.isFetching(),
  );

  constructor() {
    injectAuthenticationGuard();
  }

  public ngOnInit() {
    this.settingsService.setSettingsMenu(SETTINGS_MENU);
  }
}
