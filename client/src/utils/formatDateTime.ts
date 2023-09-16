import {
  format,
  differenceInMinutes,
  differenceInHours,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";

export function formatDateTime(dateISO: string): string {
  const currentDate = new Date();
  const date = parseISO(dateISO);

  if (isToday(date)) {
    const diffInMinutes = differenceInMinutes(currentDate, date);

    if (diffInMinutes < 60) {
      if (diffInMinutes <= 1) {
        return "1 min ago";
      } else {
        return `${diffInMinutes} mins ago`;
      }
    } else {
      const diffInHours = differenceInHours(currentDate, date);
      if (diffInHours === 1) {
        return "1 hour ago";
      } else {
        return `${diffInHours} hours ago`;
      }
    }
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mmaa")}`;
  } else {
    return format(date, "MM/dd/yyyy h:mmaa");
  }
}
