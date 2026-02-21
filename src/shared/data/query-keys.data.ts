export const QueryKeys = {
  PROFILE: 'profile',
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout',
  GET_MY_CHATS: 'get my chats',
  CREATE_CHAT: 'create chat',
  DELETE_CHAT: 'delete chat',
  ADD_CONTACT: 'add contact',
  REMOVE_CONTACT: 'remove contact',
} as const;
export type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];
