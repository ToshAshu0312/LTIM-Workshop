/**
 * Login Rate Limiter Implementation
 * 
 * This module implements a rate limiter to prevent brute force login attacks
 * by limiting the number of login attempts from a single identifier (username/IP)
 * within a specified time window.
 */

/**
 * Configuration options for the rate limiter
 */
export interface RateLimiterConfig {
  /** Maximum number of login attempts allowed within the time window */
  maxAttempts: number;
  /** Time window in milliseconds during which attempts are counted */
  windowMs: number;
  /** Optional: Time to block after exceeding max attempts (in milliseconds) */
  blockDurationMs?: number;
}

/**
 * Represents a single login attempt with timestamp
 */
interface LoginAttempt {
  /** Unique identifier (username, IP address, or combination) */
  identifier: string;
  /** Timestamp of the attempt in milliseconds */
  timestamp: number;
}

/**
 * Tracks login attempts and enforces rate limiting
 */
export class LoginRateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private blockedUntil: Map<string, number> = new Map();
  private config: RateLimiterConfig;

  /**
   * Creates a new rate limiter instance
   * @param config - Configuration options
   */
  constructor(config: RateLimiterConfig) {
    this.config = config;
    
    // Start cleanup interval to remove old entries
    this.startCleanup();
  }

  /**
   * Checks if an identifier is currently rate limited
   * @param identifier - Username, IP address, or other unique identifier
   * @returns true if rate limited, false if allowed to attempt login
   */
  isRateLimited(identifier: string): boolean {
    // Check if identifier is explicitly blocked
    const blockedUntil = this.blockedUntil.get(identifier);
    if (blockedUntil && Date.now() < blockedUntil) {
      return true;
    } else if (blockedUntil) {
      // Block period expired, remove it
      this.blockedUntil.delete(identifier);
    }

    // Get recent attempts within the time window
    const recentAttempts = this.getRecentAttempts(identifier);
    
    // Rate limited if attempts exceed the maximum
    return recentAttempts.length >= this.config.maxAttempts;
  }

  /**
   * Records a login attempt for an identifier
   * @param identifier - Username, IP address, or other unique identifier
   * @returns Object indicating if the attempt is allowed and remaining attempts
   */
  recordAttempt(identifier: string): { 
    allowed: boolean; 
    remainingAttempts: number;
    retryAfterMs?: number;
  } {
    const now = Date.now();
    
    // Check if already blocked
    if (this.isRateLimited(identifier)) {
      const blockedUntil = this.blockedUntil.get(identifier);
      const retryAfterMs = blockedUntil ? blockedUntil - now : this.config.windowMs;
      
      return {
        allowed: false,
        remainingAttempts: 0,
        retryAfterMs: Math.max(0, retryAfterMs)
      };
    }

    // Get or create attempt history for this identifier
    if (!this.attempts.has(identifier)) {
      this.attempts.set(identifier, []);
    }
    
    const attemptHistory = this.attempts.get(identifier)!;
    attemptHistory.push(now);

    // Get recent attempts after recording this one
    const recentAttempts = this.getRecentAttempts(identifier);
    const remainingAttempts = Math.max(0, this.config.maxAttempts - recentAttempts.length);

    // If max attempts exceeded, block the identifier
    if (recentAttempts.length >= this.config.maxAttempts) {
      const blockDuration = this.config.blockDurationMs || this.config.windowMs;
      this.blockedUntil.set(identifier, now + blockDuration);
      
      return {
        allowed: false,
        remainingAttempts: 0,
        retryAfterMs: blockDuration
      };
    }

    return {
      allowed: true,
      remainingAttempts
    };
  }

  /**
   * Resets the rate limit for an identifier (e.g., after successful login)
   * @param identifier - Username, IP address, or other unique identifier
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier);
    this.blockedUntil.delete(identifier);
  }

  /**
   * Gets recent attempts within the configured time window
   * @param identifier - Username, IP address, or other unique identifier
   * @returns Array of timestamps for recent attempts
   */
  private getRecentAttempts(identifier: string): number[] {
    const attemptHistory = this.attempts.get(identifier);
    if (!attemptHistory) {
      return [];
    }

    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Filter out attempts outside the time window
    const recentAttempts = attemptHistory.filter(
      timestamp => timestamp > windowStart
    );

    // Update the stored history with only recent attempts
    this.attempts.set(identifier, recentAttempts);

    return recentAttempts;
  }

  /**
   * Starts periodic cleanup of old entries to prevent memory leaks
   * Runs every windowMs duration
   */
  private startCleanup(): void {
    setInterval(() => {
      this.cleanup();
    }, this.config.windowMs);
  }

  /**
   * Removes expired entries from memory
   */
  private cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Clean up old attempts
    for (const [identifier, timestamps] of this.attempts.entries()) {
      const recentAttempts = timestamps.filter(ts => ts > windowStart);
      
      if (recentAttempts.length === 0) {
        this.attempts.delete(identifier);
      } else {
        this.attempts.set(identifier, recentAttempts);
      }
    }

    // Clean up expired blocks
    for (const [identifier, blockedUntil] of this.blockedUntil.entries()) {
      if (now >= blockedUntil) {
        this.blockedUntil.delete(identifier);
      }
    }
  }

  /**
   * Gets statistics for monitoring
   * @returns Object with current state statistics
   */
  getStats(): {
    totalTrackedIdentifiers: number;
    totalBlockedIdentifiers: number;
  } {
    return {
      totalTrackedIdentifiers: this.attempts.size,
      totalBlockedIdentifiers: this.blockedUntil.size
    };
  }
}

/**
 * Example usage demonstrating the rate limiter
 */
export function demonstrateRateLimiter(): void {
  // Create a rate limiter that allows 5 attempts per 15 minutes
  const rateLimiter = new LoginRateLimiter({
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 30 * 60 * 1000 // Block for 30 minutes after exceeding
  });

  const username = "user@example.com";

  console.log("=== Login Rate Limiter Demo ===\n");

  // Simulate login attempts
  for (let i = 1; i <= 7; i++) {
    const result = rateLimiter.recordAttempt(username);
    
    console.log(`Attempt ${i}:`);
    console.log(`  Allowed: ${result.allowed}`);
    console.log(`  Remaining attempts: ${result.remainingAttempts}`);
    
    if (result.retryAfterMs !== undefined) {
      console.log(`  Retry after: ${(result.retryAfterMs / 1000 / 60).toFixed(2)} minutes`);
    }
    console.log();
  }

  // Check if user is rate limited
  console.log(`Is ${username} rate limited? ${rateLimiter.isRateLimited(username)}`);
  
  // Display stats
  console.log("\nCurrent Statistics:");
  console.log(rateLimiter.getStats());

  // Simulate successful login - reset the rate limit
  console.log(`\nSimulating successful login for ${username}...`);
  rateLimiter.reset(username);
  console.log(`Is ${username} rate limited after reset? ${rateLimiter.isRateLimited(username)}`);
}

// Run the demo if this file is executed directly
if (require.main === module) {
  demonstrateRateLimiter();
}
