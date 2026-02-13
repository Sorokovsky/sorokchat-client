import { Component } from '@angular/core';
import { SquarePenIcon } from 'lucide-angular';

import type { IconType } from '@/shared';
import { ActionIcon } from '@/shared';

@Component({
  selector: 'app-create-chat-action',
  imports: [ActionIcon],
  templateUrl: './create-chat-action.html',
  styleUrl: './create-chat-action.scss',
})
export class CreateChatAction {
  protected readonly icon: IconType = SquarePenIcon;
}
