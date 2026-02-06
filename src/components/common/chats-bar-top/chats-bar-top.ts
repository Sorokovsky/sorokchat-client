import {Component} from '@angular/core';
import {LucideAngularModule, type LucideIconData, SquarePenIcon} from 'lucide-angular';

@Component({
  selector: 'app-chats-bar-top',
  imports: [LucideAngularModule],
  templateUrl: './chats-bar-top.html',
  styleUrl: './chats-bar-top.sass',
})
export class ChatsBarTop {
  protected readonly icon: LucideIconData = SquarePenIcon;
}
