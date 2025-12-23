# Login Rate Limiter

A TypeScript implementation of a login rate limiter to prevent brute force attacks.

## Overview

This rate limiter tracks login attempts per identifier (username, IP address, etc.) and blocks further attempts after exceeding a configured threshold within a time window.

## Features

- ✅ **Configurable limits**: Set maximum attempts and time windows
- ✅ **Automatic cleanup**: Removes old entries to prevent memory leaks
- ✅ **Block duration**: Optional extended blocking after exceeding limits
- ✅ **Independent tracking**: Each identifier is tracked separately
- ✅ **Statistics**: Monitor current state of the rate limiter
- ✅ **Reset capability**: Clear limits after successful authentication

## Implementation Checklist

- [x] Create rate limiter configuration interface
- [x] Implement LoginAttempt tracking data structure
- [x] Create RateLimiter class with core logic
- [x] Add method to check if user is rate limited
- [x] Add method to record login attempts
- [x] Implement cleanup mechanism for old entries
- [x] Create example usage and tests

## Usage

```typescript
import { LoginRateLimiter } from './loginRateLimiter';

// Create a rate limiter: 5 attempts per 15 minutes
const rateLimiter = new LoginRateLimiter({
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 30 * 60 * 1000 // Block for 30 minutes
});

// Check if user is rate limited before attempting login
const username = "user@example.com";
if (rateLimiter.isRateLimited(username)) {
  console.log("Too many login attempts. Please try again later.");
} else {
  // Attempt login...
  const result = rateLimiter.recordAttempt(username);
  
  if (!result.allowed) {
    console.log(`Login blocked. Retry after ${result.retryAfterMs}ms`);
  } else {
    console.log(`Login attempt recorded. ${result.remainingAttempts} attempts remaining.`);
    
    // If login successful, reset the rate limit
    // rateLimiter.reset(username);
  }
}
```

## Configuration

| Option | Type | Description |
|--------|------|-------------|
| `maxAttempts` | number | Maximum login attempts allowed in the time window |
| `windowMs` | number | Time window in milliseconds for counting attempts |
| `blockDurationMs` | number (optional) | Additional blocking time after exceeding max attempts |

## Methods

### `isRateLimited(identifier: string): boolean`
Checks if an identifier is currently rate limited.

### `recordAttempt(identifier: string)`
Records a login attempt and returns:
- `allowed`: Whether the attempt is permitted
- `remainingAttempts`: Number of attempts left
- `retryAfterMs`: Time to wait before retrying (if blocked)

### `reset(identifier: string): void`
Clears all rate limiting data for an identifier (use after successful login).

### `getStats()`
Returns current statistics about tracked and blocked identifiers.

## Running the Demo

```bash
# Run the built-in demonstration
ts-node loginRateLimiter.ts

# Run the test suite
ts-node loginRateLimiter.test.ts
```

## How It Works

1. **Attempt Recording**: Each login attempt is recorded with a timestamp
2. **Sliding Window**: Only attempts within the configured time window are counted
3. **Rate Limiting**: When attempts exceed the maximum, the identifier is blocked
4. **Automatic Cleanup**: Old entries are periodically removed to prevent memory growth
5. **Reset on Success**: Successful logins can reset the counter for that identifier

## Security Considerations

- Use in combination with other security measures (CAPTCHA, MFA, etc.)
- Consider tracking both username and IP address
- Implement persistent storage for production use (Redis, database)
- Monitor statistics for potential attacks
- Configure appropriate values based on your security requirements

## Example Scenarios

### Scenario 1: Normal Usage
- User makes 2 failed login attempts
- Third attempt succeeds
- Counter is reset
- User can try again normally

### Scenario 2: Brute Force Attack
- Attacker makes 5 failed attempts in 1 minute
- 6th attempt is blocked
- Attacker must wait 30 minutes
- After 30 minutes, counter resets and 5 more attempts are allowed

### Scenario 3: Distributed Attack
- Different users are tracked independently
- Each attacker gets their own rate limit
- Legitimate users are not affected by attacks on other accounts

## Future Enhancements

- Persistent storage (Redis/Database)
- IP-based rate limiting
- Progressive delays (exponential backoff)
- Whitelist/blacklist functionality
- Integration with authentication middleware
- Admin override capabilities
- Notification system for suspicious activity
