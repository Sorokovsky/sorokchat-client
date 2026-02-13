import type {Signal} from "@angular/core";
import {Component, computed} from "@angular/core";
import {RouterOutlet} from "@angular/router";

import type {GetProfileQuery} from "@/entities";
import {injectGetProfile} from "@/entities";
import {Loader} from "@/shared";

import {injectAuthenticationGuard} from "../../guards";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './root.html',
  styleUrl: './root.scss',
})
export class Root {
  private readonly profile: GetProfileQuery = injectGetProfile();
  protected readonly isLoading: Signal<boolean> = computed((): boolean =>
    this.profile.isFetching(),
  );

  constructor() {
    injectAuthenticationGuard();
  }
}
