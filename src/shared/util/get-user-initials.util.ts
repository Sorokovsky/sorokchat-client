import {type User} from '@/contracts/user/user.contrcact';

export function getUserInitials(user: User | null): string {
  if (user === null) return "👻";
  return `${user.firstName[0]}.${user.middleName[0]}.`;
}
