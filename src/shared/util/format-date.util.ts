import { formatRelative } from 'date-fns';
import { uk } from 'date-fns/locale';
export function formatDate(date: Date | string | number): string {
  const dateObject = new Date(date);
  if (isNaN(dateObject.getTime())) return '';
  return formatRelative(dateObject, new Date(), {
    locale: uk,
  });
}
