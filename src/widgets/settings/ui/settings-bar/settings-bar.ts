import type { InputSignal } from '@angular/core';
import { inject } from '@angular/core';
import { Component, input } from '@angular/core';

import { SettingsService } from '../../api';

@Component({
  selector: 'app-settings-bar',
  imports: [],
  templateUrl: './settings-bar.html',
  styleUrl: './settings-bar.scss',
})
export class SettingsBar {
  private readonly service: SettingsService = inject(SettingsService);

  public rootPath: InputSignal<string> = input.required<string>();
}
