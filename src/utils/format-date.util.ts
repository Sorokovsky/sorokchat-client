import {format, formatDistanceToNow, isToday, isYesterday} from "date-fns";
import {uk} from "date-fns/locale";

export function formatDate(date: Date | string | number): string {
  const convertedDate = new Date(date);
  const differentSeconds: number = Math.floor(Date.now() - convertedDate.getTime() / 1000);
  if (differentSeconds < 60) return "Щойно";
  if (isToday(convertedDate) || isYesterday(convertedDate)) {
    return formatDistanceToNow(convertedDate, {
      addSuffix: true,
      locale: uk
    });
  }
  return format(convertedDate, 'yyyy-MM-dd', {locale: uk});
}
