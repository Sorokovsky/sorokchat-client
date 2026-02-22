import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';

import { ContactsList } from '@/entities';

import { ContactsBarHead } from '../contacts-bar-head/contacts-bar-head';

@Component({
  selector: 'app-contacts-bar',
  imports: [ContactsList, ContactsBarHead],
  templateUrl: './contacts-bar.html',
  styleUrl: './contacts-bar.scss',
})
export class ContactsBar {
  public readonly rootPath: InputSignal<string> = input.required<string>();
}
