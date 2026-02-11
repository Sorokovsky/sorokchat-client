import type { OnInit, Signal } from '@angular/core';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import type { GetProfileQuery } from '@/entities';
import { injectGetProfile } from '@/entities';
import { Loader } from '@/shared';

import { injectAuthenticationGuard } from '../../guards';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './root.html',
  styleUrl: './root.scss',
})
export class Root implements OnInit {
  private readonly guard: Signal<void> = injectAuthenticationGuard();
  private readonly profile: GetProfileQuery = injectGetProfile();
  protected readonly isLoading: Signal<boolean> = computed((): boolean => this.profile.isLoading());

  public ngOnInit(): void {
    this.guard();
  }
}
