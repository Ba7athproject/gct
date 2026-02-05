/**
 * Format a number as a percentage string with 1 decimal place.
 * @param value The value to format.
 * @param isRatio If true (default false), assumes value is 0-1 (will multiply by 100).
 * @returns Formatted percentage string (e.g., "28.6 %").
 */
export const formatPercentage = (value: number, isRatio: boolean = false): string => {
    const numberToFormat = isRatio ? value * 100 : value;
    return `${numberToFormat.toFixed(2)} %`;
};
