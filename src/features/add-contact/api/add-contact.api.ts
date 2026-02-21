import { inject } from '@angular/core';

import type { User } from '@/entities';
import { ContactsServie } from '@/entities';
import { injectBaseMutation, QueryKeys } from '@/shared';

import type { AddContact } from '../models';

export function injectAddContact(): AddContact {
  const service: ContactsServie = inject(ContactsServie);
  return injectBaseMutation(
    [QueryKeys.ADD_CONTACT],
    async (email: string): Promise<User> => await service.addContact(email),
    [QueryKeys.PROFILE],
  );
}
