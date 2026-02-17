import { Component } from '@angular/core';

import { LogoutButton } from '@/features';
import { Heading } from '@/shared';

@Component({
  selector: 'app-privacy-page',
  imports: [Heading, LogoutButton],
  templateUrl: './privacy-page.html',
  styleUrl: './privacy-page.scss',
})
export class PrivacyPage {}
