import {Component} from '@angular/core';
import {RegisterFormComponent} from '@/components/common/register-form/register-form.component';

@Component({
  selector: 'app-register',
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.sass',
})
export class RegisterPage {

}
