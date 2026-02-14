import { Component } from '@angular/core';
import { SendIcon } from 'lucide-angular';

import type { IconType } from '@/shared';
import { ActionButton } from '@/shared';

@Component({
  selector: 'app-send-button',
  imports: [ActionButton],
  templateUrl: './send-button.html',
  styleUrl: './send-button.scss',
})
export class SendButton {
  protected readonly icon: IconType = SendIcon;
}
