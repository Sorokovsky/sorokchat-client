import {Component, input, InputSignal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LOGO_SIZE} from '@/constants/sizes.constants';

@Component({
  selector: 'app-logo',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.sass',
})
export class LogoComponent {
  public readonly image: InputSignal<string> = input.required<string>();
  public readonly size: InputSignal<number> = input<number>(LOGO_SIZE);
  public readonly alt: InputSignal<string> = input<string>("ALT attribute");
  public readonly priority: InputSignal<boolean> = input<boolean>(false);
}
