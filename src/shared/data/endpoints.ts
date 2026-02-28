export const SERVER_URL: string = '/api';
const AUTHORIZATION: string = `${SERVER_URL}/authorization`;
const USERS: string = `${SERVER_URL}/users`;
const CONTACTS: string = `${SERVER_URL}/contacts`;
const GROUPS: string = `${SERVER_URL}/groups`;

export const Endpoints = {
  REGISTER: `${AUTHORIZATION}/register`,
  LOGIN: `${AUTHORIZATION}/login`,
  LOGOUT: `${AUTHORIZATION}/logout`,
  PROFILE: `${AUTHORIZATION}/profile`,
  REFRESH_TOKENS: `${AUTHORIZATION}/refresh-tokens`,
  UPDATE_SELF: USERS,
  DELETE_SELF: USERS,
  searchUsers(term: string): string {
    return `${USERS}/${term}`;
  },
  createContact(userNickname: string): string {
    return `${CONTACTS}/create/${userNickname}`;
  },
  getContactByUser(term: string): string {
    return `${CONTACTS}/by-user/${term}`;
  },
  MY_CONTACTS: `${CONTACTS}/my`,
  CREATE_GROUPS: GROUPS,
  MY_GROUPS: `${GROUPS}/my`,
  searchGroups(term: string): string {
    return `${GROUPS}/by-term/${term}`;
  },
  updateGroup(id: number): string {
    return `${GROUPS}/by-id/${id}`;
  },
  deleteGroup(id: number): string {
    return `${GROUPS}/by-id/${id}`;
  },
  getGroup(id: number): string {
    return `${GROUPS}/by-id/${id}`;
  },
} as const;
export type Endpoints = (typeof Endpoints)[keyof typeof Endpoints];
