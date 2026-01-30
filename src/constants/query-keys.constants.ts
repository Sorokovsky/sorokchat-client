export const QueryKeys = {
  REGISTER: "register",
  LOGIN: "login",
  LOGOUT: "logout",
  PROFILE: "profile",
  GET_CHATS_BY_ME: "get chats by me",
} as const;

export type QueryKeys = typeof QueryKeys[keyof typeof QueryKeys];
