import {Component, input, InputSignal} from '@angular/core';
import {LogoComponent} from '@/components/ui/logo/logo.component';

@Component({
  selector: 'app-sorokchat-logo',
  imports: [
    LogoComponent
  ],
  templateUrl: './sorokchat-logo.component.html',
  styleUrl: './sorokchat-logo.component.sass',
})
export class SorokchatLogoComponent {
  public readonly priority: InputSignal<boolean> = input<boolean>(false);
}
