import {Component} from '@angular/core';
import {FormComponent} from '@/components/ui/form/form.component';
import {RegisterPayload, RegisterPayloadSchema} from '@/contracts/register-payload.contract';
import {Field} from '@/components/ui/form/form.types';
import {z as zod} from 'zod';
import {injectRegisterMutation, RegisterMutation} from '@/injections/register.mutation';

@Component({
  selector: 'app-register-form',
  imports: [
    FormComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.sass',
})
export class RegisterFormComponent {
  protected readonly registerMutation: RegisterMutation = injectRegisterMutation();

  protected readonly schema: zod.Schema = RegisterPayloadSchema;
  protected readonly title: string = "Реєстрація";
  protected readonly submitText: string = "Зареєструватися";
  protected readonly fields: Field[] = [
    {
      name: "email",
      type: "email",
      label: "Електронна адреса",
      placeholder: "Введіть електронну адресу"
    },
    {
      name: "password",
      type: "password",
      label: "Пароль",
      placeholder: "Введіть пароль"
    },
    {
      name: "firstName",
      type: "text",
      label: "Ім'я",
      placeholder: "Введіть ім'я"
    },
    {
      name: "lastName",
      type: "text",
      label: "Прізвище",
      placeholder: "Введіть прізвище"
    },
    {
      name: "middleName",
      type: "text",
      label: "По батькові",
      placeholder: "Введіть по батькові"
    },
  ];

  protected register(payload: RegisterPayload) {
    this.registerMutation.mutate(payload);
  }
}
