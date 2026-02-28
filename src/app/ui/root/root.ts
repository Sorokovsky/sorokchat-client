import type { Signal } from '@angular/core';
import { Component, effect, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

import { injectCanActivate } from '../../utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './root.html',
  styleUrl: './root.scss',
})
export class Root {
  private readonly canActivate: Signal<boolean | UrlTree> = injectCanActivate();
  private readonly router: Router = inject(Router);
  constructor() {
    effect((): void => {
      const result: boolean | UrlTree = this.canActivate();
      if (result instanceof UrlTree) this.router.navigateByUrl(result);
    });
  }
}
