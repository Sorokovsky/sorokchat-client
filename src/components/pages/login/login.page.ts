import {Component} from '@angular/core';
import {LoginFormComponent} from '@/components/common/login-form/login-form.component';

@Component({
  selector: 'app-login',
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.sass',
})
export class LoginPage {

}
