import { Component } from '@angular/core';

import type { Field } from '@/shared';
import { Form } from '@/shared';

import { REGISTER_FIELDS } from '../../data';

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
}
