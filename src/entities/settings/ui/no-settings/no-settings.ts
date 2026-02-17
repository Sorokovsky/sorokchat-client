import { Component } from '@angular/core';

import { EmptyMessage } from '@/shared';

@Component({
  selector: 'app-no-settings',
  imports: [EmptyMessage],
  templateUrl: './no-settings.html',
  styleUrl: './no-settings.scss',
})
export class NoSettings {}
