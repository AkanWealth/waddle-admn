function formatMoney(value: string | number): string {
  // Convert to number
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) {
    throw new Error("Invalid number");
  }

  // Format with commas and two decimals
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default formatMoney


export function subtractAndFormat(a: string | number, b: string | number): string {
  const numA = typeof a === "string" ? parseFloat(a) : a;
  const numB = typeof b === "string" ? parseFloat(b) : b;

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error("Invalid number");
  }

  return formatMoney(numA - numB);
}
