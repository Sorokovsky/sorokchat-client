import { Component } from '@angular/core';

import { DangerButton } from '@/shared';

import { injectLogout } from '../../api';
import type { Logout } from '../../models';

@Component({
  selector: 'app-logout-button',
  imports: [DangerButton],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
})
export class LogoutButton {
  private readonly mutation: Logout = injectLogout();

  protected logout(): void {
    this.mutation.mutate();
  }
}
