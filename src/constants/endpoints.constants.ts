const API_URL: string = "/api";

const AUTHORIZATION_PATH: string = `${API_URL}/authorization`;

const CHATS_PATH: string = `${API_URL}/chats`;

export const ENDPOINTS = {
  REGISTER: `${AUTHORIZATION_PATH}/register`,
  LOGIN: `${AUTHORIZATION_PATH}/login`,
  LOGOUT: `${AUTHORIZATION_PATH}/logout`,
  PROFILE: `${AUTHORIZATION_PATH}/profile`,
  CREATE_CHAT: `${CHATS_PATH}/create`,
  GET_CHATS_BY_ME: `${CHATS_PATH}/by-me`,
  DELETE_CHAT: `${CHATS_PATH}/`,
} as const;

export type ENDPOINTS = typeof ENDPOINTS[keyof typeof ENDPOINTS];
