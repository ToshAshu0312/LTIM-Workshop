
## Best Roles to Try
- "Act as a security expert..."
- "Act as a performance engineer..."
- "Act as a DevOps architect..."
- "Act as an accessibility specialist..."
- "Act as a database architect..."
- "Act as a senior developer mentoring junior..."

Review this authentication function for issues
Typical Response:
- "Consider adding error handling"
- "Add input validation"
- "Use logging for debugging"

Problems with generic review:
- Misses critical security issues
- Doesn't identify vulnerability types
- Doesn't recommend specific fixes
- Not suitable for production code



You are a security expert with 10+ years of experience in web application 
security and authentication systems. Review this TypeScript authentication 
class and identify:

1. CRITICAL Security Vulnerabilities
   - Authentication weaknesses
   - Password handling issues
   - Authorization gaps
   
2. OWASP Top 10 Risks
   - Which risks does this code have?
   - Specific evidence

3. Data Exposure Risks
   - What data could be exposed?
   - Attack vectors

4. Compliance Issues
   - GDPR concerns
   - Industry standards (e.g., NIST)
   
5. Recommended Fixes
   - Specific code changes
   - Use proper libraries (bcrypt, argon2)
   - Rate limiting strategy
   - Input validation requirements"

Expected Response Covers:
- SHA256 is not suitable for passwords (vulnerable to attacks)
- No salt in password hashing (rainbow table attacks)
- No rate limiting (brute force attacks)
- Returns password hash to client (information disclosure)
- No input validation (injection attacks)
- No password strength requirements
- No account lockout mechanism
- Specific recommendations for bcrypt/argon2
- Rate limiting implementation