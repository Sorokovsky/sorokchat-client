import { AccessRule, type Page } from '@/shared';
import { Type } from '@angular/core';
import { HandshakeIcon } from 'lucide-angular';

export const CONTACTS_PAGE: Page = {
  accessRule: AccessRule.SECURED,
  path: 'contacts/:contactId',
  title: 'Контакти',
  icon: HandshakeIcon,
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((result): Type<unknown> => result.ContactsPage),
};
