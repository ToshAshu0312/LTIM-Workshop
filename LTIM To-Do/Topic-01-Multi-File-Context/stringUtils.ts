/**
 * stringUtils.ts
 * 
 * Utility functions for string manipulation
 * Hidden in the codebase - Copilot will SEARCH and FIND these!
 */

// Capitalize first letter
export function capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Remove special characters
export function removeSpecialChars(str: string): string {
    return str.replace(/[^a-zA-Z0-9\s]/g, '');
}

// Trim and clean whitespace
export function cleanWhitespace(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
}

// Extract domain from email
export function extractDomain(email: string): string {
    const domain = email.split('@')[1];
    return domain || '';
}
