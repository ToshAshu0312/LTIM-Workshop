# Multi-File Context - Searching & Composing Across Files

**Time:** 4-5 minutes

## The Concept
Copilot doesn't just complete code in the current file - it **SEARCHES across your entire codebase**, finds utility functions scattered across multiple files, and automatically **COMPOSES them together**. This is the real power of multi-file context!

## Setup: Multiple Utility Files
Your workspace has 4 utility files scattered around:
- `formatters.ts` - Email, username, phone, country formatting
- `validators.ts` - Email, username, password, phone, name validation  
- `stringUtils.ts` - String manipulation (capitalize, clean, trim, extract)
- `errorHandling.ts` - Error response creation and error handling

**Key Point:** These files exist but aren't imported yet - Copilot will FIND them!

## Quick Demo (4-5 minutes)

### Step 1: Setup Tabs (30 sec)
Open all 4 utility files in tabs:
1. `formatters.ts` 
2. `validators.ts`
3. `stringUtils.ts`
4. `errorHandling.ts`
5. `userService.ts` (focus here)

### Step 2: Show the Problem (1 min)
Point to `userService.ts` and say:
- "I need to register new users"
- "I need to format their email, validate their name, check their password strength"
- "These helpers exist in different files"
- "But I haven't imported them - Copilot will FIND them!"

### Step 3: Trigger Copilot's Search (2-3 min)
1. **Position cursor** inside `registerNewUser()` function body
2. **Press Ctrl+Space** to trigger autocomplete
3. **Watch Copilot search** formatters.ts, validators.ts, stringUtils.ts, errorHandling.ts
4. **See the magic** as Copilot suggests:
   - All necessary imports from multiple files
   - Code that uses functions from all 4 files
   - Proper composition of utilities

### Step 4: Expected Result
Copilot will suggest something like:
```typescript
import { formatEmail } from './formatters';
import { isValidEmail, isValidName, isStrongPassword } from './validators';
import { capitalizeString, cleanWhitespace } from './stringUtils';
import { createErrorResponse } from './errorHandling';

export function registerNewUser(userData: {
    email: string;
    name: string;
    password: string;
}): {
    success: boolean;
    userId?: string;
    errors?: Record<string, string>;
} {
    const errors: Record<string, string> = {};
    
    // Format email
    const formattedEmail = formatEmail(userData.email);
    if (!isValidEmail(formattedEmail)) {
        errors.email = 'Invalid email format';
    }
    
    // Clean and validate name
    const cleanedName = capitalizeString(cleanWhitespace(userData.name));
    if (!isValidName(cleanedName)) {
        errors.name = 'Invalid name format';
    }
    
    // Validate password strength
    if (!isStrongPassword(userData.password)) {
        errors.password = 'Password must be 8+ chars with uppercase, number, and symbol';
    }
    
    // Return result
    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }
    
    const userId = 'user_' + Date.now();
    return { success: true, userId };
}
```

## Why This Matters
- ✅ Copilot SEARCHED all 4 files
- ✅ Copilot FOUND the right functions
- ✅ Copilot IMPORTED them automatically
- ✅ Copilot COMPOSED them into a working solution
- ✅ No duplication - reuses existing utilities
- ✅ Consistent with codebase patterns

## Key Teaching Points
1. **Search & Discovery**: Copilot finds functions you didn't explicitly mention
2. **Composition**: Copilot combines utilities from multiple files
3. **Intelligence**: Copilot understands which functions work together
4. **Reusability**: Encourages developers to write small, focused utility functions

## Pro Tip
After `registerNewUser()`, try the bonus challenge `validateUserProfile()` - Copilot will search and compose again with a different set of utilities!
