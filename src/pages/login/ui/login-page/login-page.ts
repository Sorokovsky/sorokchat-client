import { Component } from '@angular/core';

import { LoginForm } from '@/features';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  imports: [LoginForm],
})
export class LoginPage {}
