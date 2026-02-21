import type { ModelSignal } from '@angular/core';
import { Component, model } from '@angular/core';
import type { z as zod } from 'zod';

import type { Field } from '@/shared';
import { Popup } from '@/shared';
import { Form } from '@/shared';

import { injectAddContact } from '../../api';
import { ADD_CONTACT_FIELDS } from '../../data';
import type { AddContact, AddContactPayload } from '../../models';
import { AddContactSchema } from '../../models';

@Component({
  selector: 'app-add-contact-form',
  imports: [Popup, Form],
  templateUrl: './add-contact-form.html',
  styleUrl: './add-contact-form.scss',
})
export class AddContactForm {
  public readonly isOpen: ModelSignal<boolean> = model<boolean>(false);

  protected readonly fields: Field[] = ADD_CONTACT_FIELDS;
  protected readonly title: string = 'Додати контакт';
  protected readonly submitText: string = 'Додати';
  protected readonly schema: zod.ZodSchema<AddContactPayload> = AddContactSchema;
  private readonly addContact: AddContact = injectAddContact();

  protected addToContact(payload: AddContactPayload): void {
    this.addContact.mutate(payload.email);
    this.isOpen.set(false);
  }
}
