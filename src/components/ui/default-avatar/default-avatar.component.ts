import {Component, input, InputSignal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-default-avatar',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './default-avatar.component.html',
  styleUrl: './default-avatar.component.sass',
})
export class DefaultAvatarComponent {
  public readonly size: InputSignal<number> = input.required<number>();
}
