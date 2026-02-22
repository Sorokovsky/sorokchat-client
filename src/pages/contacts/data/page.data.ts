import type { Type } from '@angular/core';
import { HandshakeIcon } from 'lucide-angular';

import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export const CONTACTS_PAGE: Page = {
  accessRule: AccessRule.SECURED,
  path: 'contacts/:contactId',
  title: 'Контакти',
  icon: HandshakeIcon,
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((result): Type<unknown> => result.ContactsPage),
};
