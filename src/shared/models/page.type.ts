import {type Type} from '@angular/core';
import {type AccessRule} from '@/shared/models/access-rule.type';
import {type LucideIconData} from 'lucide-angular';

export type Page = {
  title: string;
  path: string;
  component?: Type<unknown>;
  accessRule: AccessRule;
  icon?: LucideIconData;
};
