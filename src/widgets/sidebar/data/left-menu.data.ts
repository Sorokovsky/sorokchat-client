import { MessageCircleIcon, SettingsIcon } from 'lucide-angular';

import { PagePaths } from '@/shared';

import type { LeftMenuItem } from '../models';

const paths = new PagePaths();

export const LEFT_TOP_MENU: LeftMenuItem[] = [
  {
    icon: MessageCircleIcon,
    link: paths.chatsUrl,
  },
];

export const LEFT_BOTTOM_MENU: LeftMenuItem[] = [
  {
    icon: SettingsIcon,
    link: paths.settingUrl,
  },
];
