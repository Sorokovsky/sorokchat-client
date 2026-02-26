import { Component } from '@angular/core';

import { RegisterForm } from '@/features';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.scss'],
  imports: [RegisterForm],
})
export class RegisterPage {}
