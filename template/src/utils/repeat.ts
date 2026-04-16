/**
 * Repeats a string `n` times.
 *
 * @param str - The string to repeat
 * @param n - Number of repetitions (negative values treated as 0)
 * @returns The repeated string
 * @example
 * repeat('a', 3); // 'aaa'
 * repeat('hi', 0); // ''
 */
export function repeat(str: string, n: number): string {
  return str.repeat(Math.max(0, n));
}
