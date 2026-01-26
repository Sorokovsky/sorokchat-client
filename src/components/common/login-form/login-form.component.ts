import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPayload, LoginPayloadScheme} from '@/contracts/login-payload';
import {FormComponent} from '@/components/ui/form/form.component';
import {Form} from '@/components/ui/form/form.types';
import {injectLoginMutation} from '@/injections/login.mutation';

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
export class LoginFormComponent implements OnInit {
  protected readonly form: Form<LoginPayload> = {
    title: "Увійти",
    onSubmit: this.login,
    zodSchema: LoginPayloadScheme,
    submitText: "Відправити",
    fields: [
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
    ]
  };
  private readonly loginMutation = injectLoginMutation();

  public ngOnInit() {
    this.form.onSubmit = this.form.onSubmit.bind(this);
  }

  private login(payload: LoginPayload): void {
    this.loginMutation.mutate(payload)
  }
}
