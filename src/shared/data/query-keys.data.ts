export const QueryKeys = {
  PROFILE: 'profile',
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout',
} as const;
export type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];
