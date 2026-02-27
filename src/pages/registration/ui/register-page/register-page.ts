import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RegisterForm } from '@/features';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.scss'],
  imports: [RegisterForm, RouterLink],
})
export class RegisterPage {}
