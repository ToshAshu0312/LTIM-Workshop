/**
 * validators.ts
 * 
 * Validation functions scattered across the codebase
 * Copilot will SEARCH these files and FIND the right validators!
 */

// Check if email is valid format
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if password meets requirements
export function isStrongPassword(password: string): boolean {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*]/.test(password)
    );
}

// Check username requirements
export function isValidUsername(username: string): boolean {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
}

// Check if phone number is valid
export function isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Check name validity
export function isValidName(name: string): boolean {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}
