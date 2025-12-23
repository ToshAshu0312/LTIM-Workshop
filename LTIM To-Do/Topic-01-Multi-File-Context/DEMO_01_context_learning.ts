/**
 * FILE 1: formatters.ts
 * 
 * This file contains utility functions that format different types of data
 * All follow the same pattern: normalize → return
 */

export function formatEmail(email: string): string {
    return email.toLowerCase().trim();
}

export function formatUsername(username: string): string {
    return username.toLowerCase().replace(/\s+/g, '_').trim();
}

export function formatCountry(country: string): string {
    return country.toUpperCase().trim();
}

export function formatPhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '').slice(-10);
}

/**
 * FILE 2: validators.ts
 * 
 * These validators use the formatters from File 1
 * Pattern: Format first, then validate, return {isValid, normalized}
 */

interface ValidationResult<T> {
    isValid: boolean;
    normalized?: T;
    error?: string;
}

export function validateEmail(email: string): ValidationResult<string> {
    const normalized = formatEmail(email);
    
    if (!normalized.includes('@')) {
        return { isValid: false, error: 'Missing @ symbol' };
    }
    
    const [local, domain] = normalized.split('@');
    if (!domain.includes('.')) {
        return { isValid: false, error: 'Invalid domain' };
    }
    
    return { isValid: true, normalized };
}

export function validateUsername(username: string): ValidationResult<string> {
    const normalized = formatUsername(username);
    
    if (normalized.length < 3) {
        return { isValid: false, error: 'Username too short' };
    }
    
    if (!/^[a-z0-9_]+$/.test(normalized)) {
        return { isValid: false, error: 'Invalid characters' };
    }
    
    return { isValid: true, normalized };
}

export function validatePhoneNumber(phone: string): ValidationResult<string> {
    const normalized = formatPhoneNumber(phone);
    
    if (normalized.length !== 10) {
        return { isValid: false, error: 'Phone must be 10 digits' };
    }
    
    return { isValid: true, normalized };
}

// ============================================================
// NEW VALIDATOR - Let Copilot Complete This
// ============================================================

/**
 * FILE 3: userService.ts
 * 
 * Here's a new function that needs to be completed.
 * Copilot has now read:
 * - formatters.ts (knows the formatting patterns)
 * - validators.ts (knows the validation structure)
 * 
 * Now it needs to complete validateAndFormatAddress()
 * 
 * DEMO INSTRUCTION:
 * Position cursor after the function signature and press Ctrl+Space
 * Copilot will suggest code that:
 * 1. Uses formatAddress (which it learned from formatters.ts)
 * 2. Follows the ValidationResult pattern (from validators.ts)
 * 3. Matches the validation structure of other functions
 */

export function validateAndFormatAddress(address: string): ValidationResult<string> {
    // POSITION CURSOR HERE AND PRESS Ctrl+Space
    // Copilot will suggest the complete implementation!
    // It will:
    // - Create a formatAddress call (learning from formatters.ts)
    // - Use the ValidationResult pattern (from validators.ts)
    // - Follow the same structure as validateEmail, validateUsername, validatePhoneNumber
}

// ============================================================
// EXPECTED COPILOT SUGGESTION
// ============================================================

/*
Expected completion (what Copilot learns from the other files):

export function validateAndFormatAddress(address: string): ValidationResult<string> {
    const normalized = formatAddress(address);
    
    if (normalized.length < 5) {
        return { isValid: false, error: 'Address too short' };
    }
    
    if (!/^[a-zA-Z0-9\s,.-]+$/.test(normalized)) {
        return { isValid: false, error: 'Invalid address format' };
    }
    
    return { isValid: true, normalized };
}

Notice:
1. Uses formatAddress (which doesn't exist yet - Copilot suggests creating it!)
2. Uses ValidationResult<string> pattern (from validators.ts)
3. Follows exact structure as other validators
4. Same error handling pattern
5. Same return format

This is multi-file context at work!
*/

// ============================================================
// KEY DEMONSTRATION POINTS
// ============================================================

/*
MULTI-FILE CONTEXT IN ACTION:

Before (without Copilot):
- Developer reads formatters.ts
- Developer reads validators.ts
- Developer writes new validator manually
- Takes 10+ minutes
- Might miss pattern details

With Copilot + Multi-File Context:
1. Copilot reads ALL FILES in workspace
2. Identifies pattern: Format → Validate → Return Result
3. Understands imports and relationships
4. Suggests complete, consistent code
5. Takes 30 seconds
6. 100% consistency with existing code

This is why multi-file context is powerful!
Copilot doesn't just complete the current file.
It understands your entire codebase architecture.
*/

