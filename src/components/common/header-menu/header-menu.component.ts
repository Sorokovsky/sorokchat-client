import {Component, input, InputSignal} from '@angular/core';
import {Page} from '@/constants/pages.constants';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.sass',
})
export class HeaderMenuComponent {
  public readonly pages: InputSignal<Page[]> = input.required<Page[]>();
}
