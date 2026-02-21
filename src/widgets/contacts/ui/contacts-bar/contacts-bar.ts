import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import { ContactsBarHead } from '../contacts-bar-head/contacts-bar-head';
import { ContactsList } from '../contacts-list/contacts-list';

@Component({
  selector: 'app-contacts-bar',
  imports: [ContactsList, ContactsBarHead],
  templateUrl: './contacts-bar.html',
  styleUrl: './contacts-bar.scss',
})
export class ContactsBar {
  public readonly rootPath: InputSignal<string> = input.required<string>();
}
