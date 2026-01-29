import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPayload, LoginPayloadSchema} from '@/contracts/login-payload';
import {FormComponent} from '@/components/ui/form/form.component';
import {Field} from '@/components/ui/form/form.types';
import {injectLoginMutation, LoginMutation} from '@/injections/login.mutation';
import {z as zod} from 'zod';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.sass',
})
export class LoginFormComponent {
  protected readonly title: string = "Увійти";
  protected readonly schema: zod.Schema = LoginPayloadSchema;
  protected readonly submitText: string = "Відправити";
  protected readonly fields: Field[] = [
    {
      name: "email",
      label: "Електронна адреса",
      type: "email",
      placeholder: "Введіть електронну адресу",
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      placeholder: "Введіть пароль"
    }
  ];
  private readonly loginMutation: LoginMutation = injectLoginMutation();

  protected login(payload: LoginPayload): void {
    this.loginMutation.mutate(payload)
  }
}
