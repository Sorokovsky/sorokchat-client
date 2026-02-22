import type { Signal } from '@angular/core';
import { Component, computed } from '@angular/core';

import type { GetProfileQuery, User } from '@/entities';
import { injectGetProfile } from '@/entities';
import { EmptyMessage, injectParameter } from '@/shared';
import { CurrentContact } from '@/widgets';

@Component({
  selector: 'app-contracts-page',
  imports: [EmptyMessage, CurrentContact],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss',
})
export class ContactsPage {
  private readonly contactId: Signal<string | null> = injectParameter('contactId');
  private readonly profile: GetProfileQuery = injectGetProfile();

  protected readonly contact: Signal<User | null> = computed<User | null>((): User | null => {
    const contactId: string | null = this.contactId();
    if (!contactId || Number.isNaN(contactId)) return null;
    const id: number = Number(contactId);
    const contacts: User[] = this.profile.data()?.contacts ?? [];
    return contacts.find((user: User): boolean => user.id === id) ?? null;
  });
}
