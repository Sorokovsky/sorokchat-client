export const QueryKeys = {
  REGISTER: "register",
  LOGIN: "login",
  LOGOUT: "logout",
  PROFILE: "profile",
} as const;

export type QueryKeys = typeof QueryKeys[keyof typeof QueryKeys];
