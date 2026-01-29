import {Component, input, InputSignal, signal, Signal, WritableSignal} from '@angular/core';
import {CurrentUserAvatarComponent} from '@/components/common/current-user-avatar/current-user-avatar.component';
import {ContextMenuComponent} from '@/components/ui/context-menu/context-menu.component';
import {HEADER_PAGES, Page} from '@/constants/pages.constants';
import {injectGetPageByAccessRule} from '@/injections/inject-get-page-by.guard';

@Component({
  selector: 'app-header-avatar',
  imports: [
    CurrentUserAvatarComponent,
    ContextMenuComponent
  ],
  templateUrl: './header-avatar.component.html',
  styleUrl: './header-avatar.component.sass',
})
export class HeaderAvatarComponent {
  protected readonly menu: Signal<Page[]> = injectGetPageByAccessRule(HEADER_PAGES);
  protected readonly isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly positionStyles: InputSignal<string> = input<string>(
    "top: 60rem;" +
    "left: 0;" +
    "position: absolute;" +
    "z-index: 2;",
  );

  protected hideContext(): void {
    this.isMenuOpen.set(false);
  }

  protected showContext(): void {
    this.isMenuOpen.set(true);
  }

  protected toggleContext(): void {
    this.isMenuOpen.update((value: boolean): boolean => !value);
  }
}
