import { Component } from '@angular/core';
import { EllipsisIcon } from 'lucide-angular';

import type { IconType } from '@/shared';
import { ActionButton } from '@/shared';

@Component({
  selector: 'app-get-chat-info-action',
  imports: [ActionButton],
  templateUrl: './get-chat-info-action.html',
  styleUrl: './get-chat-info-action.scss',
})
export class GetChatInfoAction {
  protected readonly icon: IconType = EllipsisIcon;
}
