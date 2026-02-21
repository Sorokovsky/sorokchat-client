import type { ModelSignal } from '@angular/core';
import { Component, model } from '@angular/core';
import { SquarePenIcon } from 'lucide-angular';

import type { IconType } from '@/shared';
import { ActionButton } from '@/shared';

import { AddContactForm } from '../add-contact-form/add-contact-form';

@Component({
  selector: 'app-add-contact-action',
  imports: [ActionButton, AddContactForm],
  templateUrl: './add-contact-action.html',
  styleUrl: './add-contact-action.scss',
})
export class AddContactAction {
  public readonly isOpen: ModelSignal<boolean> = model<boolean>(false);

  protected readonly icon: IconType = SquarePenIcon;

  protected toggle() {
    this.isOpen.update((previous: boolean): boolean => !previous);
  }
}
