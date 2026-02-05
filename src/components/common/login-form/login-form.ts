import {Component} from '@angular/core';
import {Form} from '@/components/ui/form/form';
import {LOGIN_FIELDS} from '@/constants/login-form.constants';
import {type Field} from '@/components/ui/form/form.contract';
import {type LoginPayload, LoginPayloadSchema} from '@/contracts/login-payload';
import {z as zod} from "zod";
import {injectLoginMutation, type LoginMutation} from '@/injections/login.mutation';

@Component({
  selector: 'app-login-form',
  imports: [
    Form,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.sass',
})
export class LoginForm {
  protected readonly fields: Field[] = LOGIN_FIELDS;
  protected readonly schema: zod.Schema = LoginPayloadSchema;
  protected readonly title: string = 'Вхід';
  protected readonly submitText: string = "Увійти";
  protected loginMutation: LoginMutation = injectLoginMutation();

  protected login(payload: LoginPayload): void {
    this.loginMutation.mutate(payload);
  }
}
