import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names together using `clsx` and `tailwind-merge`.
 * This utility is commonly used for conditionally applying Tailwind CSS classes.
 * `clsx` handles the conditional logic and joining of class names,
 * while `tailwind-merge` resolves conflicting Tailwind CSS utility classes
 * to ensure a clean and predictable final class string.
 *
 * @param {...ClassValue} inputs - A list of class values to merge.
 *   `ClassValue` can be a string, number, boolean, object, or array.
 *   Falsy values are ignored. Objects are treated as dictionaries where keys
 *   are class names and values are booleans indicating whether to include the class.
 *   Arrays are recursively processed.
 * @returns {string} A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
