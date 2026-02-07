import {Component} from '@angular/core';
import {type Field, Form} from '@/shared';
import {LOGIN_FIELDS} from '@/feature/login/models';
import {injectLoginMutation, type LoginMutation} from "@/feature/login/api";
import {type LoginPayload, LoginPayloadSchema} from '@/entity';
import {z as zod} from "zod";

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
