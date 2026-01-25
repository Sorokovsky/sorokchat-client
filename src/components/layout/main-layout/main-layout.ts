import {Component} from '@angular/core';
import {HeaderComponent} from '@/components/common/header/header.component';
import {LoginFormComponent} from '@/components/common/login-form/login-form.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    LoginFormComponent
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.sass',
})
export class MainLayout {

}
