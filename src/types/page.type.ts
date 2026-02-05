import {type Type} from '@angular/core';
import {type AccessRule} from '@/types/access-rule.type';

export type Page = {
  title: string;
  path: string;
  component?: Type<unknown>;
  accessRule: AccessRule;
};
