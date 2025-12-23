/**
 * formatters.ts
 * 
 * Utility functions for formatting different data types
 * 
 * Pattern: All formatters normalize the input and return the formatted value
 * This pattern is important - Copilot will learn it!
 */

/**
 * Format email: lowercase and trim whitespace
 */
export function formatEmail(email: string): string {
    return email.toLowerCase().trim();
}

/**
 * Format username: lowercase, remove spaces, replace with underscores
 */
export function formatUsername(username: string): string {
    return username.toLowerCase().replace(/\s+/g, '_').trim();
}

/**
 * Format country: uppercase and trim
 */
export function formatCountry(country: string): string {
    return country.toUpperCase().trim();
}

/**
 * Format phone number: remove non-digits, keep last 10
 */
export function formatPhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '').slice(-10);
}

/**
 * PATTERN COPILOT LEARNS:
 * 1. All functions take a string input
 * 2. All perform some transformation
 * 3. All return a string
 * 4. Pattern is: normalize → transform → return
 * 
 * When Copilot sees a new formatter needed, it will
 * automatically suggest the same pattern!
 */
