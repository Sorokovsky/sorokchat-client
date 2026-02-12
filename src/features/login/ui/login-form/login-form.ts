import { Component } from '@angular/core';
import type { z as zod } from 'zod';

import type { LoginPayload } from '@/entities';
import { LoginSchema } from '@/entities';
import type { Field } from '@/shared';
import { Form } from '@/shared';

import { injectLogin } from '../../api';
import { LOGIN_FIELDS } from '../../data';
import type { LoginMutation } from '../../models';

@Component({
  selector: 'app-login-form',
  imports: [Form],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  protected readonly title: string = 'Вхід';
  protected readonly submitText: string = 'Увійти';
  protected readonly fields: Field[] = LOGIN_FIELDS;
  protected readonly schema: zod.ZodSchema<LoginPayload> = LoginSchema;
  private readonly mutation: LoginMutation = injectLogin();

  public login(payload: LoginPayload): void {
    this.mutation.mutate(payload);
  }
}
