/**
 * Capitalizes the first character of a string.
 *
 * @param str - The string to capitalize
 * @returns The string with its first character uppercased, or empty string if input is empty
 * @example
 * capitalize('hello'); // 'Hello'
 * capitalize(''); // ''
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
