import {Component} from '@angular/core';
import {SorokchatLogoComponent} from '@/components/common/sorokchat-logo/sorokchat-logo.component';
import {HeaderAvatarComponent} from '@/components/common/header-avatar/header-avatar.component';

@Component({
  selector: 'app-header',
  imports: [
    SorokchatLogoComponent,
    HeaderAvatarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
}
