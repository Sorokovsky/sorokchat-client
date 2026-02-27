import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { GenericSchema } from 'valibot';

import type { LoginPayload } from '@/entities';
import { LoginSchema } from '@/entities';
import type { Field } from '@/shared';
import { FormComponent, PagePaths } from '@/shared';

import { LOGIN_FIELDS } from '../../data';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  imports: [RouterLink, FormComponent],
})
export class LoginForm {
  protected readonly fields: Field[] = LOGIN_FIELDS;
  protected readonly schema: GenericSchema<LoginPayload> = LoginSchema;
  private readonly pathService: PagePaths = inject(PagePaths);
  protected readonly registerUrl: string = this.pathService.registerUrl;

  protected login(payload: LoginPayload): void {
    console.log(payload);
  }
}
