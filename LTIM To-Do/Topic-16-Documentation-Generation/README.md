# Topic 16: Documentation Generation with GitHub Copilot

## Overview
Use GitHub Copilot to automatically generate comprehensive documentation, including README files, API docs, code comments, and user guides.

## Learning Objectives
- Write clear README files
- Generate JSDoc/TSDoc comments
- Create API documentation
- Write getting started guides
- Generate changelog entries
- Document architecture decisions

## Example Prompts

### README Generation
```
Create a comprehensive README.md for this project:
- Project title and description
- Installation instructions
- Usage examples
- API reference
- Contributing guidelines
- License
```

### Code Comments
```
Add JSDoc comments to this function with:
- Description
- @param documentation
- @returns explanation
- @example usage
```

### API Documentation
```
Generate OpenAPI/Swagger documentation for these REST endpoints:
[paste routes]
```

### Architecture Decision
```
Create an Architecture Decision Record (ADR) for choosing React over Vue:
- Context
- Decision
- Consequences
- Alternatives considered
```

### User Guide
```
Write a user guide for this feature with:
- Step-by-step instructions
- Screenshots placeholders
- Common issues and solutions
- Tips and best practices
```

## Documentation Types

### Code-Level Documentation
- **Inline comments** - Explain complex logic
- **JSDoc/TSDoc** - Function and class documentation
- **Type definitions** - TypeScript interfaces
- **Examples** - Usage demonstrations

### Project Documentation
- **README.md** - Project overview
- **CONTRIBUTING.md** - How to contribute
- **CHANGELOG.md** - Version history
- **LICENSE** - Legal terms
- **CODE_OF_CONDUCT.md** - Community guidelines

### API Documentation
- **OpenAPI/Swagger** - REST API specs
- **GraphQL Schema** - Query documentation
- **Postman Collections** - API examples
- **SDK Documentation** - Client libraries

### Architecture Documentation
- **ADRs** - Architecture Decision Records
- **System diagrams** - Visual architecture
- **Data flow diagrams** - How data moves
- **Deployment guides** - How to deploy

## Best Practices
1. **Keep docs close to code** - Co-locate when possible
2. **Update with code changes** - Docs should never be stale
3. **Use clear language** - Avoid jargon
4. **Include examples** - Show, don't just tell
5. **Add visual aids** - Diagrams, screenshots
6. **Version your docs** - Match code versions
7. **Make it searchable** - Good structure and naming
8. **Test your examples** - Ensure they work

## Documentation Template

### Function Documentation
```typescript
/**
 * Calculates the shipping cost based on weight and distance.
 * 
 * Uses a base rate of $0.50 per pound plus $0.10 per mile.
 * All calculations are rounded to 2 decimal places.
 * 
 * @param weight - Package weight in pounds (must be > 0)
 * @param distance - Shipping distance in miles (must be > 0)
 * @returns Total shipping cost in dollars
 * @throws {Error} If weight or distance is invalid
 * 
 * @example
 * ```typescript
 * const cost = calculateShipping(10, 100);
 * console.log(cost); // 15.00
 * ```
 */
export function calculateShipping(weight: number, distance: number): number {
    // Implementation...
}
```

### API Endpoint Documentation
```yaml
/api/shipping/calculate:
  post:
    summary: Calculate shipping cost
    description: Calculates shipping cost based on package weight and delivery distance
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              weight:
                type: number
                description: Package weight in pounds
                example: 10
              distance:
                type: number
                description: Distance in miles
                example: 100
    responses:
      200:
        description: Shipping cost calculated successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                cost:
                  type: number
                  example: 15.00
```

## Exercises
- [ ] Generate complete README for Todo app
- [ ] Add JSDoc comments to all functions
- [ ] Create API documentation with examples
- [ ] Write a troubleshooting guide
- [ ] Document environment setup
- [ ] Create architecture diagram description

## Tools
- **JSDoc** - JavaScript documentation
- **TypeDoc** - TypeScript documentation
- **Swagger/OpenAPI** - API documentation
- **Docusaurus** - Documentation website
- **Markdown** - Universal format
- **Mermaid** - Diagrams as code

## Resources
- Write the Docs community
- Google Developer Documentation Style Guide
- Microsoft Writing Style Guide
- Divio Documentation System (4 types)
