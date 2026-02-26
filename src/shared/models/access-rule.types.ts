export const AccessRule = {
  PERMIT_ALL: 'PERMIT_ALL',
  DENY_ALL: 'DENY_ALL',
  SECURED: 'SECURED',
  ANONYMOUS: 'ANONYMOUS',
} as const;

export type AccessRule = (typeof AccessRule)[keyof typeof AccessRule];
