# DEMO 2: Iterative Refinement - Progressive Improvement

## Learning Objective
Show how structured, iterative prompts lead to better results than single requests

## Demo File Structure
This demo shows two approaches:

### APPROACH 1: Vague Request (Bad)
```
"Create a validation function"
```

Result: Basic, incomplete validation

### APPROACH 2: Structured Request (Good)
```
Create an email validation function with:
1. Check for @ symbol
2. Check for domain with TLD (.com, .org, etc)
3. Return detailed error messages (not just true/false)
4. Detect and fix common typos (gmial.com -> gmail.com)
5. Handle whitespace trimming
```

Result: Professional, complete validation function

## Demo Steps

### Step 1: Show Vague Request (1 min)
1. Copy the vague request to Copilot Chat
2. Show the result
3. Point out: Missing error messages, no typo detection, incomplete

### Step 2: Explain Improvement (30 sec)
"Notice the difference when we structure our request with specific requirements"

### Step 3: Show Structured Request (1 min)
1. Copy the structured request to Copilot Chat
2. Show the much more complete result
3. Highlight: Detailed validation, error messages, typo detection

### Step 4: Conclusion (30 sec)
"Better prompts = Better results. Structure is key."

## Total Time: 3 minutes

## Why This Matters
- Structured requests save iteration cycles
- Clear requirements prevent rework
- Team gets better code faster
- Less back-and-forth with AI

## Key Talking Point
"Iterative refinement isn't about asking Copilot over and over. 
It's about getting the structure right from the start, then improving incrementally."
