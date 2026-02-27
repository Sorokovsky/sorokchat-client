import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RegisterForm } from '@/features';
import { PagePaths } from '@/shared';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.scss'],
  imports: [RegisterForm, RouterLink],
})
export class RegisterPage {
  private pathService: PagePaths = inject(PagePaths);

  protected loginUrl: string = this.pathService.loginUrl;
}
