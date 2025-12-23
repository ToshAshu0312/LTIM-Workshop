# Topic 14: Security Scanning with GitHub Copilot

## Overview
Use GitHub Copilot to identify and fix security vulnerabilities in your code, following OWASP best practices.

## Learning Objectives
- Detect common security vulnerabilities
- Fix SQL injection vulnerabilities
- Prevent XSS (Cross-Site Scripting) attacks
- Secure authentication and authorization
- Handle sensitive data properly

## Example Prompts

### Security Review
```
Review this code for security vulnerabilities:
[paste code]

Check for:
- SQL injection
- XSS vulnerabilities
- Insecure authentication
- Hard-coded secrets
```

### Fix Vulnerabilities
```
Fix the SQL injection vulnerability in this function using parameterized queries
```

### Input Validation
```
Add input validation and sanitization to prevent XSS attacks
```

### Secure Authentication
```
Implement secure password hashing using bcrypt with proper salt rounds
```

## Common Vulnerabilities to Check

### OWASP Top 10
1. **Broken Access Control** - Unauthorized access
2. **Cryptographic Failures** - Weak encryption
3. **Injection** - SQL, NoSQL, Command injection
4. **Insecure Design** - Missing security controls
5. **Security Misconfiguration** - Default configs
6. **Vulnerable Components** - Outdated dependencies
7. **Authentication Failures** - Weak password policies
8. **Data Integrity Failures** - Unsigned/unverified data
9. **Logging Failures** - Insufficient monitoring
10. **SSRF** - Server-Side Request Forgery

## Best Practices
1. **Never trust user input** - Always validate and sanitize
2. **Use parameterized queries** - Prevent SQL injection
3. **Hash passwords** - Never store plain text
4. **Use HTTPS** - Encrypt data in transit
5. **Keep dependencies updated** - Patch vulnerabilities
6. **Implement rate limiting** - Prevent brute force
7. **Use security headers** - CSP, HSTS, X-Frame-Options
8. **Scan regularly** - Automated security checks

## Exercises
- [ ] Fix a SQL injection vulnerability
- [ ] Implement secure JWT authentication
- [ ] Add input validation for user registration
- [ ] Scan code for hard-coded secrets
- [ ] Implement rate limiting for login attempts

## Resources
- OWASP Top 10: https://owasp.org/Top10/
- GitHub Security Best Practices
- CWE (Common Weakness Enumeration)
