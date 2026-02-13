import type { Type } from '@angular/core';
import { MessageCircleIcon } from 'lucide-angular';

import type { Page } from '@/shared';
import { AccessRule } from '@/shared';

export const CHATS_PAGE: Page = {
  title: 'Чати',
  loadComponent: (): Promise<Type<unknown>> =>
    import('../ui').then((result): Type<unknown> => result.ChatsPage),
  path: 'chats/:chatId',
  accessRule: AccessRule.SECURED,
  icon: MessageCircleIcon,
};
