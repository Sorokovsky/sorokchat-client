export const AccessRule = {
  SECURED: "SECURED",
  ANONYMOUS: "ANONYMOUS",
  PERMIT_ALL: "PERMIT_ALL",
  DENY_ALL: "DENY_ALL",
} as const;

export type AccessRule = typeof AccessRule[keyof typeof AccessRule];
