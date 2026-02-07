import {type User} from '@/entity';

export function getUserInitials(user: User | null): string {
  if (user === null) return "👻";
  return `${user.firstName[0]}.${user.middleName[0]}.`;
}
