export const StorageKeys = {
  ACCESS_TOKEN: 'access-token',
} as const;

export type StorageKeys = (typeof StorageKeys)[keyof typeof StorageKeys];
