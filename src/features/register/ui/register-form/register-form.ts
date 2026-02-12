import { Component } from '@angular/core';
import type { z as zod } from 'zod';

import type { RegisterPayload } from '@/entities';
import { RegisterSchema } from '@/entities';
import type { Field } from '@/shared';
import { Form } from '@/shared';

import { injectRegister } from '../../api';
import { REGISTER_FIELDS } from '../../data';
import type { RegisterMutation } from '../../models';

@Component({
  selector: 'app-register-form',
  imports: [Form],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  protected readonly fields: Field[] = REGISTER_FIELDS;
  protected readonly title: string = 'Реєстрація';
  protected readonly submitText: string = 'Зареєструватися';
  protected readonly schema: zod.Schema = RegisterSchema;
  private readonly mutation: RegisterMutation = injectRegister();

  protected register(payload: RegisterPayload): void {
    this.mutation.mutate(payload);
  }
}
