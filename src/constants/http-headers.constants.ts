export const HttpHeaders = {
  Authorization: "Authorization",
  ACCEPT_LANGUAGE: "Accept-Language",
} as const;

export type HttpHeaders = typeof HttpHeaders[keyof typeof HttpHeaders];
