import type { WritableSignal } from '@angular/core';
import { Component, signal } from '@angular/core';
import { SquarePenIcon } from 'lucide-angular';

import type { IconType } from '@/shared';
import { ActionButton, Popup } from '@/shared';

@Component({
  selector: 'app-create-chat-action',
  imports: [ActionButton, Popup],
  templateUrl: './create-chat-action.html',
  styleUrl: './create-chat-action.scss',
})
export class CreateChatAction {
  protected readonly icon: IconType = SquarePenIcon;
  protected readonly isPopupOpen: WritableSignal<boolean> = signal(false);

  protected openPopup(): void {
    this.isPopupOpen.set(true);
  }
}
