/**
 * String format
 **/

/**
 * Format string.
 * For example: formatString('Total count is : %1', [100]) will return 'Total count is : 100'
 * @param {string} origin
 * @param {string[]} replacement
 * @returns {string}
 */
export function formatString(origin: string, replacement: any[]): string {
  if (replacement.length) {
    for (let idx = 0; idx < replacement.length; idx++) {
      const str = replacement[idx] ? replacement[idx].toString() : '';
      origin = origin.replace(`%${idx + 1}`, str);
    }
  }

  return origin;
}
