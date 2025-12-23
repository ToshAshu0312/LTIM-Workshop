# Topic 17: Test-Driven Development (TDD) with GitHub Copilot

## Overview
Learn Test-Driven Development methodology using GitHub Copilot to write tests first, then implement features that pass those tests.

## Learning Objectives
- Understand the TDD cycle (Red-Green-Refactor)
- Write tests before implementation
- Use tests to drive design decisions
- Achieve high test coverage naturally
- Refactor with confidence

## TDD Cycle

### 1. 🔴 Red - Write a Failing Test
```typescript
// Write the test first
describe('UserService', () => {
    test('should create a new user with valid data', () => {
        const userData = { name: 'John', email: 'john@example.com' };
        const user = createUser(userData);
        
        expect(user).toBeDefined();
        expect(user.id).toBeTruthy();
        expect(user.name).toBe('John');
    });
});

// Test fails because createUser() doesn't exist yet
```

### 2. 🟢 Green - Write Minimal Code to Pass
```typescript
// Implement just enough to pass the test
export function createUser(data: { name: string; email: string }) {
    return {
        id: Date.now(),
        name: data.name,
        email: data.email
    };
}

// Test passes!
```

### 3. 🔵 Refactor - Improve Code Quality
```typescript
// Refactor with confidence (tests protect you)
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

export function createUser(data: { name: string; email: string }): User {
    return {
        id: generateId(),
        name: data.name.trim(),
        email: data.email.toLowerCase(),
        createdAt: new Date()
    };
}

// Tests still pass after refactoring!
```

## Example Prompts

### Test-First Development
```
I need to create a function that validates email addresses.
Write failing tests first covering:
- Valid email formats
- Invalid emails (no @, no domain, etc.)
- Edge cases (empty, null, special chars)

Then implement the function to pass all tests.
```

### Design Through Tests
```
Write tests for a shopping cart that can:
- Add items
- Remove items
- Calculate total price
- Apply discount codes

Then implement the CartService class.
```

### Test Coverage
```
Review this implementation and write additional tests to achieve 100% coverage:
[paste code]
```

### Refactoring with Tests
```
I have these passing tests. Refactor the implementation to use better design patterns:
[paste tests and code]
```

## TDD Best Practices

### 1. Start with the Simplest Test
```typescript
// Don't start here:
test('should handle complex user registration with validation and email', () => {
    // Too complex for first test
});

// Start here:
test('should create user with name', () => {
    const user = createUser({ name: 'John' });
    expect(user.name).toBe('John');
});
```

### 2. Test Behavior, Not Implementation
```typescript
// ❌ Bad - tests implementation
test('should call database.save() method', () => {
    const spy = jest.spyOn(database, 'save');
    saveUser(user);
    expect(spy).toHaveBeenCalled();
});

// ✅ Good - tests behavior
test('should persist user data', async () => {
    const user = await saveUser({ name: 'John' });
    const retrieved = await getUser(user.id);
    expect(retrieved.name).toBe('John');
});
```

### 3. One Assertion Per Test (When Possible)
```typescript
// ❌ Multiple concerns in one test
test('should create and validate user', () => {
    const user = createUser(data);
    expect(user.id).toBeDefined();
    expect(validateUser(user)).toBe(true);
});

// ✅ Separate concerns
test('should assign ID to new user', () => {
    const user = createUser(data);
    expect(user.id).toBeDefined();
});

test('should create valid user data', () => {
    const user = createUser(data);
    expect(validateUser(user)).toBe(true);
});
```

### 4. Follow the AAA Pattern
```typescript
test('should add item to cart', () => {
    // Arrange
    const cart = new ShoppingCart();
    const item = { id: 1, name: 'Book', price: 10 };
    
    // Act
    cart.addItem(item);
    
    // Assert
    expect(cart.items).toHaveLength(1);
    expect(cart.total).toBe(10);
});
```

## TDD Advantages

### Design Benefits
- **Better architecture** - Tests force modular design
- **Clear interfaces** - Test-driven APIs are easier to use
- **SOLID principles** - Naturally emerge from TDD
- **Loosely coupled** - Easier to test = better design

### Quality Benefits
- **Fewer bugs** - Caught early in development
- **High coverage** - 80%+ coverage naturally
- **Living documentation** - Tests show how code works
- **Regression prevention** - Tests catch breaking changes

### Workflow Benefits
- **Faster development** - Less debugging time
- **Confident refactoring** - Tests catch regressions
- **Clear requirements** - Tests document expected behavior
- **Incremental progress** - Small, testable steps

## Common TDD Patterns

### Test Data Builders
```typescript
class UserBuilder {
    private data = { name: 'Default', email: 'default@test.com' };
    
    withName(name: string) {
        this.data.name = name;
        return this;
    }
    
    withEmail(email: string) {
        this.data.email = email;
        return this;
    }
    
    build() {
        return createUser(this.data);
    }
}

// Usage in tests:
const user = new UserBuilder()
    .withName('John')
    .withEmail('john@example.com')
    .build();
```

### Test Fixtures
```typescript
describe('UserService', () => {
    let service: UserService;
    let mockDatabase: MockDatabase;
    
    beforeEach(() => {
        mockDatabase = new MockDatabase();
        service = new UserService(mockDatabase);
    });
    
    test('should create user', () => {
        // Test uses clean fixtures
    });
});
```

## Exercises

### Exercise 1: Email Validator (Easy)
1. Write tests for email validation
2. Implement the validator
3. Refactor to use regex

### Exercise 2: Shopping Cart (Medium)
1. Write tests for cart operations
2. Implement cart class
3. Add discount functionality (test-first)

### Exercise 3: User Authentication (Advanced)
1. Write tests for login/logout
2. Implement auth service
3. Add password hashing (test-first)
4. Add session management (test-first)

### Exercise 4: Todo App (Comprehensive)
1. Write full test suite for Todo CRUD
2. Implement backend API
3. Add filtering and sorting (test-first)
4. Refactor to use Repository pattern

## TDD Anti-Patterns to Avoid

❌ **Testing implementation details**  
❌ **Writing tests after code** (not TDD!)  
❌ **Skipping the refactor step**  
❌ **Tests too coupled to code structure**  
❌ **Not running tests frequently**  
❌ **Ignoring failing tests**  
❌ **Writing tests for trivial code**  

## Tools & Frameworks
- **Jest** - JavaScript/TypeScript testing
- **Mocha/Chai** - Alternative JS framework
- **JUnit** - Java testing
- **pytest** - Python testing
- **RSpec** - Ruby testing
- **Testing Library** - React/DOM testing

## Resources
- "Test Driven Development: By Example" by Kent Beck
- "Growing Object-Oriented Software, Guided by Tests"
- Martin Fowler's articles on testing
- TDD kata exercises (coding-dojo.org)

## Keyboard Shortcuts
- Run tests: `npm test`
- Watch mode: `npm test -- --watch`
- Coverage: `npm test -- --coverage`
- Single file: `npm test -- UserService.test.ts`
