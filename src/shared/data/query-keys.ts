export const QueryKeys = {
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout',
  PROFILE: 'profile',
  REFRESH_TOKENS: 'refresh-tokens',
  UPDATE_SELF: 'update self',
  DELETE_SELF: 'delete self',
  SEARCH_USER: 'search user',
  CREATE_CONTACT: 'create contact',
  GET_USER_CONTACT: 'get user contact',
  GET_MY_CONTACTS: 'get my contacts',
  CREATE_GROUP: 'create group',
  GET_MY_GROUPS: 'get my groups',
  SEARCH_GROUP: 'search group',
  UPDATE_GROUP: 'update group',
  DELETE_GROUP: 'delete group',
  GET_GROUP: 'get group',
} as const;

export type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];
