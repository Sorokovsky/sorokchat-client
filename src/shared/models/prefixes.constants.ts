export const Prefixes = {
  BEARER: "Bearer"
} as const;

export type Prefixes = typeof Prefixes[keyof typeof Prefixes];
