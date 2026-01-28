import {Component} from '@angular/core';
import {FormComponent} from '@/components/ui/form/form.component';
import {RegisterPayload, RegisterPayloadSchema} from '@/contracts/register-payload.contract';
import {z as zod} from 'zod';
import {injectRegisterMutation} from '@/injections/register.mutation';
import {CreateMutationResult} from '@tanstack/angular-query-experimental';
import {ProblemDetail} from '@/contracts/problem-detail.contract';
import {User} from '@/contracts/user.contrcact';
import {Field} from '@/components/ui/form/form.types';

@Component({
  selector: 'app-register-page',
  imports: [
    FormComponent
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.sass',
})
export class RegisterPage {
  protected readonly registerMutation: CreateMutationResult<User, ProblemDetail, RegisterPayload, User> = injectRegisterMutation();

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
