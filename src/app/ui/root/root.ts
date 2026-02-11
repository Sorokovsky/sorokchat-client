import type { OnInit, Signal } from '@angular/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { injectAuthenticationGuard } from '../../guards';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './root.html',
  styleUrl: './root.scss',
})
export class Root implements OnInit {
  private readonly guard: Signal<void> = injectAuthenticationGuard();

  public ngOnInit(): void {
    this.guard();
  }
}
