import { Component } from '@angular/core';
import { XIcon } from 'lucide-angular';

import { ActionButton } from '@/shared';

import type { IconType } from '../../models';

@Component({
  selector: 'app-popup-close',
  imports: [ActionButton],
  templateUrl: './popup-close.html',
  styleUrl: './popup-close.scss',
})
export class PopupClose {
  protected readonly icon: IconType = XIcon;
}
