import { Component } from '@angular/core';
import { SquarePenIcon } from 'lucide-angular';

import type { IconType } from '@/shared';
import { ActionButton } from '@/shared';

@Component({
  selector: 'app-add-contact-action',
  imports: [ActionButton],
  templateUrl: './add-contact-action.html',
  styleUrl: './add-contact-action.scss',
})
export class AddContactAction {
  protected readonly icon: IconType = SquarePenIcon;
}
