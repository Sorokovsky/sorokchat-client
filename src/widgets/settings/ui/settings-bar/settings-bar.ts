import type { InputSignal, Signal } from '@angular/core';
import { computed } from '@angular/core';
import { inject } from '@angular/core';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { Page } from '@/shared';
import { Heading, Icon } from '@/shared';

import { SettingsService } from '../../api';

@Component({
  selector: 'app-settings-bar',
  imports: [Heading, RouterLink, Icon],
  templateUrl: './settings-bar.html',
  styleUrl: './settings-bar.scss',
})
export class SettingsBar {
  private readonly service: SettingsService = inject(SettingsService);

  public rootPath: InputSignal<string> = input.required<string>();

  protected readonly menu: Signal<Page[]> = computed((): Page[] => this.service.settings());

  public getLink(item: Page): string {
    return `${this.rootPath()}/${item.path}`;
  }
}
