import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { ICON_SIZE } from '@/shared';

import type { LeftMenuItem } from '../../models';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.html',
  styleUrl: './left-menu.scss',
  imports: [RouterLink, LucideAngularModule, RouterLinkActive],
})
export class LeftMenu {
  public readonly menu: InputSignal<LeftMenuItem[]> = input.required<LeftMenuItem[]>();
  protected readonly size: number = ICON_SIZE;
}
