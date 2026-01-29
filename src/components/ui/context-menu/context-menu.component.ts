import {Component, input, InputSignal} from '@angular/core';
import {Page} from '@/constants/pages.constants';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-context-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.sass',
})
export class ContextMenuComponent {
  public readonly isOpen: InputSignal<boolean> = input<boolean>(false);
  public readonly menu: InputSignal<Page[]> = input.required<Page[]>();
}
