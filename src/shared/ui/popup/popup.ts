import type { ModelSignal } from '@angular/core';
import { Component, model } from '@angular/core';

import { PopupClose } from '../popup-close/popup-close';

@Component({
  selector: 'app-popup',
  imports: [PopupClose],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup {
  public readonly isOpen: ModelSignal<boolean> = model(false);

  protected close(): void {
    this.isOpen.set(false);
  }
}
