import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {zodValidator} from '@/validators/zod.validator';
import {LoginPayloadScheme} from '@/contracts/login-payload';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.sass',
})
export class LoginFormComponent {
  protected readonly form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: [''],
      password: ['']
    }, {validators: [zodValidator(LoginPayloadScheme)]});
  }
}
