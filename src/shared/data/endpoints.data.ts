const BASE_URL: string = import.meta.env.NG_APP_API_URL || '/api';
const AUTHORIZATION: string = `${BASE_URL}/authorization`;
const CHATS: string = `${BASE_URL}/chats`;

export const Endpoints = {
  REGISTER: `${AUTHORIZATION}/register`,
  LOGIN: `${AUTHORIZATION}/login`,
  LOGOUT: `${AUTHORIZATION}/logout`,
  PROFILE: `${AUTHORIZATION}/profile`,
  CREATE_CHAT: `${CHATS}/create`,
  GET_CHATS_BY_ME: `${CHATS}/by-me`,
  CHATS: CHATS,
} as const;
export type Endpoints = (typeof Endpoints)[keyof typeof Endpoints];
