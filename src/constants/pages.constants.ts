import {type Type} from '@angular/core';

export const AccessRule = {
  SECURED: "SECURED",
  ANONYMOUS: "ANONYMOUS",
  PERMIT_ALL: "PERMIT_ALL",
  DENY_ALL: "DENY_ALL",
} as const;
export type AccessRule = typeof AccessRule[keyof typeof AccessRule];

export type Page = {
  title: string;
  path: string;
  component?: Type<unknown>;
  accessRule: AccessRule;
};

export const ALL_PAGES: Page[] = Array.from(new Set([]));
