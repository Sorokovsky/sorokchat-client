import { Heading } from '@/shared';
import { Component, input, InputSignal } from '@angular/core';
import { ContactsList } from '../contacts-list/contacts-list';

@Component({
  selector: 'app-contacts-bar',
  imports: [Heading, ContactsList],
  templateUrl: './contacts-bar.html',
  styleUrl: './contacts-bar.scss',
})
export class ContactsBar {
  public readonly rootPath: InputSignal<string> = input.required<string>();
}
