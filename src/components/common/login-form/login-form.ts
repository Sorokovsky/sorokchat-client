import {Component} from '@angular/core';
import {Form} from '@/components/ui/form/form';
import {LOGIN_FIELDS} from '@/constants/login-form.constants';
import {type Field} from '@/components/ui/form/form.contract';
import {LoginPayloadSchema} from '@/contracts/login-payload';
import {z as zod} from "zod";

@Component({
  selector: 'app-login-form',
  imports: [
    Form
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.sass',
})
export class LoginForm {
  protected readonly fields: Field[] = LOGIN_FIELDS;
  protected readonly schema: zod.Schema = LoginPayloadSchema;
  protected readonly title: string = 'Вхід';
  protected readonly submitText: string = "Відправити";
}
