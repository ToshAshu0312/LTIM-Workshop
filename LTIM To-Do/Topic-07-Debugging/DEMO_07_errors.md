# Common Errors and Copilot Analysis

## ERROR 1: Cannot Read Property of Undefined

### The Error
```
TypeError: Cannot read property 'email' of undefined
    at getUser (/app/services/user.ts:15:10)
    at getUserEmail (/app/api/auth.ts:42:5)
    at processRequest (/app/index.ts:5:1)
```

### What Copilot Analyzes
**Root Cause**: The variable `user` is `undefined` when code tries to access `.email`

**Why It Happened**: 
- Function didn't validate that user exists before accessing properties
- User lookup returned null/undefined
- No null-check before accessing `.email`

**Location**: Line 15 in user.ts

**Fix**:
```typescript
// Before (causes error)
const user = await database.find(userId);
console.log(user.email); // Crashes if user is null

// After (prevents error)
const user = await database.find(userId);
if (!user) {
    throw new Error('User not found');
}
console.log(user.email); // Safe now
```

### Prevention
- Always validate responses before accessing properties
- Use optional chaining: `user?.email`
- Add null-checks at function boundaries

---

## ERROR 2: Cannot Find Module

### The Error
```
Error: Cannot find module 'express'
    at Function.Module._resolveFilename (internal/modules/commonjs/loader.js:906:35)
    at Function.Module._load (internal/modules/commonjs/loader.js:773:13)
    at Module.require (internal/modules/commonjs/loader.js:809:21)
```

### What Copilot Analyzes
**Root Cause**: The 'express' module is imported but not installed

**Why It Happened**:
- npm install was never run after cloning repo
- package.json exists but node_modules doesn't
- Module is listed in package.json but missing from disk

**Location**: Top of file with `import express from 'express'`

**Fix**:
```bash
# Install dependencies
npm install

# Or install specific module
npm install express

# Or clean and reinstall
rm -rf node_modules
npm install
```

### Prevention
- Always run `npm install` after cloning
- Check `node_modules` exists before running
- Use lock files (package-lock.json) for consistency

---

## ERROR 3: Async/Await Syntax

### The Error
```
SyntaxError: await is only valid in async functions
    at /app/services/data.ts:10:5
```

### What Copilot Analyzes
**Root Cause**: Using `await` in a non-async function

**Why It Happened**:
- Forgot to mark function as `async`
- Used `await` on line 10 but function is not declared async
- Syntax rule: await only works in async functions

**Location**: Line 10 in data.ts

**Fix**:
```typescript
// Before (causes error)
function fetchData() {
    const data = await api.get('/data'); // ERROR: await in non-async
    return data;
}

// After (prevents error)
async function fetchData() {
    const data = await api.get('/data'); // OK: await in async function
    return data;
}
```

### Prevention
- Always use `async` keyword before function that uses `await`
- Remember: `async` function = can use `await`
- For arrow functions: `async () => { await ... }`

---

## ERROR 4: Type Mismatch

### The Error
```
TypeError: Expected string, got number
Type 'number' is not assignable to type 'string'
    at /app/services/validation.ts:8:3
```

### What Copilot Analyzes
**Root Cause**: Passing wrong data type to function expecting different type

**Why It Happened**:
- Function expects string, received number
- TypeScript caught this (good!)
- Value passed doesn't match parameter type

**Location**: Line 8 in validation.ts

**Fix**:
```typescript
// Function expects string
function formatEmail(email: string): string {
    return email.toLowerCase();
}

// Before (causes error)
const result = formatEmail(12345); // ERROR: passing number, not string

// After (prevents error)
const result = formatEmail('john@example.com'); // OK: passing string
const result = formatEmail((12345).toString()); // OK: converting to string
```

### Prevention
- Check parameter types match function signature
- Use TypeScript for type safety
- IDE will highlight type mismatches

---

## ERROR 5: Array Index Out of Bounds

### The Error
```
TypeError: Cannot read property '3' of undefined
    at /app/services/list.ts:22:5
```

### What Copilot Analyzes
**Root Cause**: Accessing array index that doesn't exist

**Why It Happened**:
- Array has fewer elements than code assumes
- Trying to access index 3 but array only has 2 elements
- No bounds checking before access

**Location**: Line 22 in list.ts

**Fix**:
```typescript
// Before (causes error)
const items = ['a', 'b'];
console.log(items[3]); // undefined - causes error downstream

// After (prevents error)
const items = ['a', 'b'];
if (items.length > 3) {
    console.log(items[3]); // Safe
} else {
    console.log('Index out of bounds');
}

// Or safer:
console.log(items[3] ?? 'not found'); // Use nullish coalescing
```

### Prevention
- Check array length before accessing indexes
- Use `.find()` instead of direct index access
- Use optional chaining: `array?.[3]`

---

## How to Use Errors for Debugging

### Step 1: Copy the Error
```
Copy the full error message and stack trace
```

### Step 2: Ask Copilot
```
"Analyze this error and suggest a fix"

[Paste error message and code]
```

### Step 3: Understand the Analysis
- Root cause explained in plain English
- Location of problem identified
- Fix with code examples provided

### Step 4: Apply the Fix
- Copy Copilot's code fix
- Paste into your file
- Test to verify it works

### Step 5: Prevent Future Occurrences
- Follow the prevention tips
- Add similar checks elsewhere in code
- Improve error handling generally

---

## Key Benefits of Error Analysis

✅ **Instant Diagnosis** - Understand errors immediately  
✅ **Specific Fixes** - Not generic solutions, but exact fixes  
✅ **Code Examples** - See exactly what to change  
✅ **Prevention Tips** - Avoid same error in future  
✅ **Learning** - Understand why error happened  

## Time Saved

- Manual debugging: 30 minutes to 2 hours per error
- With Copilot: 2 minutes per error
- That's **15-30x faster**

## Common Error Patterns

- Null/undefined access: "Cannot read property of undefined"
- Missing modules: "Cannot find module"
- Type mismatches: "Type X is not assignable to type Y"
- Async/await: "await is only valid in async functions"
- Array bounds: "Index out of bounds"
- Import errors: "Cannot find module"

**All of these, Copilot can quickly diagnose and fix!**
