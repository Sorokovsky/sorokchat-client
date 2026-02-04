import {type User} from '@/contracts/user.contrcact';

export function getUserInitials(user: User): string {
  return `${user.firstName[0]}.${user.middleName[0]}.`;
}
