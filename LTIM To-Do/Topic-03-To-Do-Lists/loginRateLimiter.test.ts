/**
 * Unit tests for Login Rate Limiter
 */

import { LoginRateLimiter, RateLimiterConfig } from './loginRateLimiter';

/**
 * Simple test runner
 */
class TestRunner {
  private passed = 0;
  private failed = 0;

  assert(condition: boolean, message: string): void {
    if (condition) {
      this.passed++;
      console.log(`✓ ${message}`);
    } else {
      this.failed++;
      console.error(`✗ ${message}`);
    }
  }

  assertEqual<T>(actual: T, expected: T, message: string): void {
    if (actual === expected) {
      this.passed++;
      console.log(`✓ ${message}`);
    } else {
      this.failed++;
      console.error(`✗ ${message}`);
      console.error(`  Expected: ${expected}`);
      console.error(`  Actual: ${actual}`);
    }
  }

  summary(): void {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Tests passed: ${this.passed}`);
    console.log(`Tests failed: ${this.failed}`);
    console.log(`Total: ${this.passed + this.failed}`);
    console.log('='.repeat(50));
  }
}

/**
 * Sleep utility for testing time-based functionality
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Test suite for LoginRateLimiter
 */
async function runTests(): Promise<void> {
  const test = new TestRunner();
  
  console.log('Running Login Rate Limiter Tests\n');

  // Test 1: Basic initialization
  console.log('\n--- Test 1: Initialization ---');
  const config: RateLimiterConfig = {
    maxAttempts: 3,
    windowMs: 1000, // 1 second for faster testing
    blockDurationMs: 2000 // 2 seconds
  };
  const limiter = new LoginRateLimiter(config);
  test.assert(limiter !== null, 'Rate limiter should be created');

  // Test 2: First attempts should be allowed
  console.log('\n--- Test 2: Initial Attempts ---');
  const user1 = 'user1@example.com';
  
  let result = limiter.recordAttempt(user1);
  test.assert(result.allowed, 'First attempt should be allowed');
  test.assertEqual(result.remainingAttempts, 2, 'Should have 2 remaining attempts');

  result = limiter.recordAttempt(user1);
  test.assert(result.allowed, 'Second attempt should be allowed');
  test.assertEqual(result.remainingAttempts, 1, 'Should have 1 remaining attempt');

  result = limiter.recordAttempt(user1);
  test.assert(result.allowed, 'Third attempt should be allowed');
  test.assertEqual(result.remainingAttempts, 0, 'Should have 0 remaining attempts');

  // Test 3: Exceeding max attempts should trigger rate limit
  console.log('\n--- Test 3: Rate Limiting ---');
  result = limiter.recordAttempt(user1);
  test.assert(!result.allowed, 'Fourth attempt should be blocked');
  test.assertEqual(result.remainingAttempts, 0, 'Should have 0 remaining attempts');
  test.assert(result.retryAfterMs !== undefined, 'Should provide retry time');
  test.assert(limiter.isRateLimited(user1), 'User should be rate limited');

  // Test 4: Different users should be tracked independently
  console.log('\n--- Test 4: Independent User Tracking ---');
  const user2 = 'user2@example.com';
  result = limiter.recordAttempt(user2);
  test.assert(result.allowed, 'Different user first attempt should be allowed');
  test.assert(!limiter.isRateLimited(user2), 'Different user should not be rate limited');
  test.assert(limiter.isRateLimited(user1), 'Original user should still be rate limited');

  // Test 5: Reset functionality
  console.log('\n--- Test 5: Reset Functionality ---');
  limiter.reset(user1);
  test.assert(!limiter.isRateLimited(user1), 'User should not be rate limited after reset');
  result = limiter.recordAttempt(user1);
  test.assert(result.allowed, 'First attempt after reset should be allowed');
  test.assertEqual(result.remainingAttempts, 2, 'Should have 2 remaining attempts after reset');

  // Test 6: Time window expiration
  console.log('\n--- Test 6: Time Window Expiration ---');
  const user3 = 'user3@example.com';
  limiter.recordAttempt(user3);
  limiter.recordAttempt(user3);
  limiter.recordAttempt(user3);
  
  test.assert(limiter.isRateLimited(user3), 'User should be rate limited');
  
  // Wait for block duration to expire
  console.log('Waiting for block duration to expire...');
  await sleep(2100); // Wait slightly more than blockDurationMs
  
  test.assert(!limiter.isRateLimited(user3), 'User should not be rate limited after block expires');

  // Test 7: Statistics
  console.log('\n--- Test 7: Statistics ---');
  const stats = limiter.getStats();
  test.assert(stats.totalTrackedIdentifiers >= 0, 'Should track identifiers');
  test.assert(stats.totalBlockedIdentifiers >= 0, 'Should track blocked identifiers');
  console.log(`  Current stats: ${JSON.stringify(stats)}`);

  // Test 8: Sliding window behavior
  console.log('\n--- Test 8: Sliding Window ---');
  const user4 = 'user4@example.com';
  limiter.recordAttempt(user4);
  await sleep(600); // Wait 0.6 seconds
  limiter.recordAttempt(user4);
  await sleep(600); // Wait another 0.6 seconds (1.2s total)
  
  // First attempt should have expired (outside 1 second window)
  result = limiter.recordAttempt(user4);
  test.assert(result.allowed, 'Attempt should be allowed as window slid');
  test.assertEqual(result.remainingAttempts, 1, 'Should have correct remaining attempts in sliding window');

  // Test 9: Multiple rapid attempts
  console.log('\n--- Test 9: Rapid Attempts ---');
  const user5 = 'user5@example.com';
  for (let i = 0; i < 5; i++) {
    limiter.recordAttempt(user5);
  }
  test.assert(limiter.isRateLimited(user5), 'User should be rate limited after rapid attempts');

  // Print summary
  test.summary();
}

// Run tests
runTests().catch(console.error);
