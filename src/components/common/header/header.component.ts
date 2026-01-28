import {Component, Signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {HEADER_PAGES, Page} from '@/constants/pages.constants';
import {injectGetPageByAccessRule} from '@/injections/inject-get-page-by.guard';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  protected readonly pages: Signal<Page[]> = injectGetPageByAccessRule(HEADER_PAGES);
}
