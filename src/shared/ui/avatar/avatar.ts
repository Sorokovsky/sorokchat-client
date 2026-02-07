import {Component, input, type InputSignal} from '@angular/core';
import {type AvatarType} from '@/types/avatar.type';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './avatar.html',
  styleUrl: './avatar.sass',
})
export class Avatar {
  public value: InputSignal<string> = input.required<string>();
  public type: InputSignal<AvatarType> = input.required<AvatarType>();
  public alt: InputSignal<string> = input.required<string>();
}
