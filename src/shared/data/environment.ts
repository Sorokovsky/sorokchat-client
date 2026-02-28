export const Environment = {
  SERVER_URL: import.meta.env.NG_APP_SERVER_URL,
  NODE_ENV: import.meta.env.NG_APP_NODE_ENV,
} as const;
export type Environment = (typeof Environment)[keyof typeof Environment];
