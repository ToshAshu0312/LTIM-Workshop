/**
 * USER REGISTRATION FLOW
 * 
 * DEMO: Copilot searching across multiple utility files
 * 
 * Your codebase has several utility files:
 * - formatters.ts (string formatting functions)
 * - validators.ts (validation functions)
 * - stringUtils.ts (string manipulation)
 * - errorHandling.ts (error utilities)
 * 
 * Now you need to build a complete user registration function.
 * Watch as Copilot SEARCHES all files and finds the right utilities!
 * 
 * DEMO STEPS:
 * 1. Keep all 4 utility files open in tabs
 * 2. Focus on userService.ts
 * 3. Position cursor in registerNewUser function
 * 4. Press Ctrl+Space
 * 5. Copilot will search across all files and import what it needs!
 */

/**
 * NEW REQUIREMENT: Build a complete user registration flow
 * 
 * Copilot will SEARCH the codebase and find:
 * - formatEmail() from formatters.ts
 * - isValidEmail() from validators.ts
 * - capitalizeString() from stringUtils.ts
 * - isValidName() from validators.ts
 * - isStrongPassword() from validators.ts
 * - createErrorResponse() from errorHandling.ts
 * 
 * All automatically by reading the other files!
 */
export function registerNewUser(userData: {
    email: string;
    name: string;
    password: string;
}): {
    success: boolean;
    userId?: string;
    errors?: Record<string, string>;
} {
    // POSITION CURSOR HERE and press Ctrl+Space
    // 
    // Copilot will search formatters.ts, validators.ts, stringUtils.ts, 
    // and errorHandling.ts to find the right functions!
    // 
    // It will suggest imports like:
    // - import { formatEmail } from './formatters';
    // - import { isValidEmail, isValidName, isStrongPassword } from './validators';
    // - import { capitalizeString, cleanWhitespace } from './stringUtils';
    // - import { createErrorResponse } from './errorHandling';
    //
    // Then write code that uses all these functions together!
}

/**
 * BONUS CHALLENGE: Another function using multi-file search
 * 
 * Try this one too! Copilot will SEARCH and find all utilities
 */
export function validateUserProfile(user: {
    email: string;
    name: string;
    phone: string;
}): { valid: boolean; errors?: string[] } {
    // POSITION CURSOR HERE and press Ctrl+Space
    // Copilot will search across all utility files and compose
    // the validation using functions from multiple files!
}

/**
 * ============================================================
 * WHAT THIS DEMONSTRATES: MULTI-FILE CONTEXT
 * ============================================================
 * 
 * Without multi-file context:
 * - Copilot only sees userService.ts
 * - It doesn't know about helper functions
 * - It might duplicate code or invent functions that don't exist
 * - Code is inconsistent across the codebase
 * 
 * With multi-file context:
 * - Copilot SEARCHES across all workspace files
 * - It FINDS existing utility functions
 * - It IMPORTS them automatically
 * - It COMPOSES them together
 * - Code is consistent and reusable!
 * 
 * RESULT: Copilot becomes aware of your entire codebase architecture!
 */

/**
 * ============================================================
 * EXPECTED COPILOT SUGGESTION FOR registerNewUser
 * ============================================================
 * 
 * When you position cursor and press Ctrl+Space,
 * Copilot will search across all files and suggest:
 * 
 * import { formatEmail } from './formatters';
 * import { isValidEmail, isValidName, isStrongPassword } from './validators';
 * import { capitalizeString, cleanWhitespace } from './stringUtils';
 * import { createErrorResponse } from './errorHandling';
 * 
 * export function registerNewUser(userData: {
 *     email: string;
 *     name: string;
 *     password: string;
 * }): {
 *     success: boolean;
 *     userId?: string;
 *     errors?: Record<string, string>;
 * } {
 *     const errors: Record<string, string> = {};
 *     
 *     // Format email using formatter
 *     const formattedEmail = formatEmail(userData.email);
 *     if (!isValidEmail(formattedEmail)) {
 *         errors.email = 'Invalid email format';
 *     }
 *     
 *     // Clean name using string utils
 *     const cleanedName = capitalizeString(cleanWhitespace(userData.name));
 *     if (!isValidName(cleanedName)) {
 *         errors.name = 'Invalid name format';
 *     }
 *     
 *     // Validate password
 *     if (!isStrongPassword(userData.password)) {
 *         errors.password = 'Password must be 8+ chars with uppercase, number, and symbol';
 *     }
 *     
 *     // Return with proper error handling
 *     if (Object.keys(errors).length > 0) {
 *         return { success: false, errors };
 *     }
 *     
 *     const userId = 'user_' + Date.now();
 *     return { success: true, userId };
 * }
 * 
 * NOTICE:
 * 1. Imported from 4 different utility files (Copilot SEARCHED!)
 * 2. Used functions from each file in the right way
 * 3. Composed them together into a complete workflow
 * 4. Error handling matches the pattern from errorHandling.ts
 * 5. All WITHOUT explicit instructions!
 * 
 * This is Copilot's SEARCH and COMPOSE ability - true multi-file context!
 */
