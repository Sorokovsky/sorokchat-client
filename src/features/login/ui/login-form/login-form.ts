import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { GenericSchema } from 'valibot';

import type { LoginPayload } from '@/entities';
import { LoginSchema } from '@/entities';
import type { Field } from '@/shared';
import { FormComponent, PagePaths } from '@/shared';

import { injectLogin } from '../../api';
import { LOGIN_FIELDS } from '../../data';
import type { Login } from '../../models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  imports: [RouterLink, FormComponent],
})
export class LoginForm {
  private readonly pathService: PagePaths = inject(PagePaths);
  private readonly mutation: Login = injectLogin();

  protected readonly fields: Field[] = LOGIN_FIELDS;
  protected readonly schema: GenericSchema<LoginPayload> = LoginSchema;
  protected readonly registerUrl: string = this.pathService.registerUrl;

  protected login(payload: LoginPayload): void {
    this.mutation.mutate(payload);
  }
}
