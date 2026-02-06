import {Component} from '@angular/core';
import {LoginForm} from '@/components/common/authorization/login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [
    LoginForm
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.sass',
})
export class LoginPage {

}
