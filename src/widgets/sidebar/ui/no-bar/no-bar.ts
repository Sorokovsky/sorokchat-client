import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Avatar } from '@/shared';

@Component({
  selector: 'app-no-bar',
  imports: [Avatar, RouterLink],
  templateUrl: './no-bar.html',
  styleUrl: './no-bar.scss',
})
export class NoBar {}
