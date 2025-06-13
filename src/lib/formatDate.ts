export const formatCustomDate = (
  input: Date | string,
  format: string
): string => {
  const date = new Date(input);

  const map: Record<string, string> = {
    DD: String(date.getDate()).padStart(2, "0"),
    D: String(date.getDate()),
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    M: String(date.getMonth() + 1),
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
  };

  return format.replace(/DD|D|MM|M|YYYY|YY/g, (match) => map[match]);
};

export default formatCustomDate