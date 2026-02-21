import { Component } from '@angular/core';

import { AddContactAction } from '@/features';
import { Heading } from '@/shared';

@Component({
  selector: 'app-contacts-bar-head',
  imports: [Heading, AddContactAction],
  templateUrl: './contacts-bar-head.html',
  styleUrl: './contacts-bar-head.scss',
})
export class ContactsBarHead {}
