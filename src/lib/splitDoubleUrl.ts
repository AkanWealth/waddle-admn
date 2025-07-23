// function splitDoubleUrl(input: string): string[] {
//   const parts = input.split("https://");

//   // If fewer than 3 parts, no double URLs found
//   if (parts.length < 3) {
//     return [];
//   }

//   // Re-add 'https://' prefix to each extracted part except the first empty split part
//   return ["https://" + parts[1], "https://" + parts[2]];
// }

function splitDoubleUrl(input: string | null | undefined): string[] {
  if (!input) return [];
  const parts = input.split("https://");
  if (parts.length < 3) return [];
  return ["https://" + parts[1], "https://" + parts[2]];
}

// Example usage:
export default splitDoubleUrl;

export function splitInstructions(input: string): string[] {
  console.log("Input to splitInstructions:", input);
  if (!input) return [];
  // Split by commas and trim whitespace
  return input
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}
