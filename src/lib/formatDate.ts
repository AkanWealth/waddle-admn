export const formatCustomDate = (
  input: Date | string,
  format: string
): string => {
  const date = new Date(input);

  const day = date.getDate();
  const month = date.getMonth(); // 0-indexed
  const year = date.getFullYear();

  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const map: Record<string, string> = {
    Do: getOrdinal(day),
    DD: String(day).padStart(2, "0"),
    D: String(day),
    MMMM: monthNames[month],
    MM: String(month + 1).padStart(2, "0"),
    M: String(month + 1),
    YYYY: String(year),
    YY: String(year).slice(-2),
  };

  return format.replace(/Do|DD|D|MMMM|MM|M|YYYY|YY/g, (match) => map[match]);
};

export default formatCustomDate;
