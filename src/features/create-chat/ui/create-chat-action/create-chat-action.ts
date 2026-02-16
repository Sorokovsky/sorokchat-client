import type { WritableSignal } from '@angular/core';
import { Component, signal } from '@angular/core';
import { SquarePenIcon } from 'lucide-angular';

import type { IconType } from '@/shared';
import { ActionButton, Popup } from '@/shared';

import { CreateChatForm } from '../create-chat-form/create-chat-form';

@Component({
  selector: 'app-create-chat-action',
  imports: [ActionButton, Popup, CreateChatForm],
  templateUrl: './create-chat-action.html',
  styleUrl: './create-chat-action.scss',
})
export class CreateChatAction {
  protected readonly icon: IconType = SquarePenIcon;
  protected readonly isPopupOpen: WritableSignal<boolean> = signal(false);

  protected openPopup(): void {
    this.isPopupOpen.set(true);
  }

  protected closePopup(): void {
    this.isPopupOpen.set(false);
  }
}
