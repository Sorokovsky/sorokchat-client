export const Environment = {
  SERVER_URL: import.meta.env["NG_APP_SERVER_URL"]
} as const;

export type Environment = typeof Environment[keyof typeof Environment];
