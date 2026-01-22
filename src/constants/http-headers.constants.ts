export const HttpHeaders = {
  Authorization: "Authorization",
} as const;

export type HttpHeaders = typeof HttpHeaders[keyof typeof HttpHeaders];
