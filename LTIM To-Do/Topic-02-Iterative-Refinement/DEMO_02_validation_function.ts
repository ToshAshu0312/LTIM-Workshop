/**
 * DEMO 2 COMPANION: Validation Function Example
 * 
 * This file shows the before/after of iterative refinement
 */

// ============================================================
// APPROACH 1: VAGUE REQUEST (Don't use this)
// ============================================================

// Request: "Create a validation function"
// Result: Basic and incomplete

export function validateEmail1(email: string): boolean {
    return email.includes('@');
}

// ============================================================
// APPROACH 2: STRUCTURED REQUEST (Use this approach!)
// ============================================================

// Request:
// Create an email validation function with:
// 1. Check for @ symbol
// 2. Check for domain with TLD (.com, .org, etc)
// 3. Return detailed error messages (not just true/false)
// 4. Detect and fix common typos (gmial.com -> gmail.com)
// 5. Handle whitespace trimming

interface ValidationResult {
    valid: boolean;
    error?: string;
    corrected?: string;
}

export function validateEmail2(email: string): ValidationResult {
    // Trim whitespace
    email = email.trim();

    // Check for @ symbol
    if (!email.includes('@')) {
        return { valid: false, error: 'Missing @ symbol' };
    }

    // Split email parts
    const [localPart, domain] = email.split('@');

    // Check domain has TLD
    if (!domain.includes('.')) {
        return { valid: false, error: 'Domain must have a TLD (.com, .org, etc)' };
    }

    // Common typo detection and correction
    const commonTypos: Record<string, string> = {
        'gmial.com': 'gmail.com',
        'gmai.com': 'gmail.com',
        'yahooo.com': 'yahoo.com',
        'hotmial.com': 'hotmail.com',
    };

    for (const [typo, correct] of Object.entries(commonTypos)) {
        if (domain === typo) {
            return {
                valid: true,
                corrected: `${localPart}@${correct}`,
                error: undefined,
            };
        }
    }

    return { valid: true };
}

// ============================================================
// DEMONSTRATE THE DIFFERENCE
// ============================================================

console.log('Vague approach:');
console.log(validateEmail1('john@gmail.com')); // true - but what about typos?
console.log(validateEmail1('john.gmail.com')); // false - generic boolean

console.log('\nStructured approach:');
console.log(validateEmail2('john@gmail.com')); // { valid: true }
console.log(validateEmail2('john.gmail.com')); // { valid: false, error: 'Missing @ symbol' }
console.log(validateEmail2('john@gmial.com')); // { valid: true, corrected: 'john@gmail.com' }

/*
KEY DIFFERENCE:
- Approach 1: boolean return (not useful for debugging)
- Approach 2: detailed validation with error messages and typo correction

THIS IS WHAT STRUCTURED REQUESTS GET YOU!
*/
