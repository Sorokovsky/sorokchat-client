import {Environment} from '@/configs/environment.config';

const authorization: string = `${Environment.SERVER_URL}/authorization`;

const chats: string = `${Environment.SERVER_URL}/chats`;

export const ENDPOINTS = {
  REGISTER: `${authorization}/register`,
  LOGIN: `${authorization}/login`,
  LOGOUT: `${authorization}/logout`,
  PROFILE: `${authorization}/profile`,
  CREATE_CHAT: `${chats}/create`,
  GET_CHAT_BY_ME: `${chats}/by-me`,
  DELETE_CHAT: `${chats}/`,
} as const;

export type ENDPOINTS = typeof ENDPOINTS[keyof typeof ENDPOINTS];
