export const Environment = {
  SERVER_URL: import.meta.env.VITE_SERVER_URL ?? "/api",
} as const;

export type Environment = typeof Environment[keyof typeof Environment];
