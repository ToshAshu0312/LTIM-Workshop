/**
 * errorHandling.ts
 * 
 * Error handling utilities scattered in the codebase
 * Copilot will SEARCH and FIND these when building error handling!
 */

// Handle API errors
export function handleApiError(statusCode: number): string {
    const errorMap: Record<number, string> = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
    };
    return errorMap[statusCode] || 'Unknown Error';
}

// Log error to console with formatting
export function logError(message: string, error: any): void {
    console.error(`[ERROR] ${message}:`, error);
}

// Create error response object
export function createErrorResponse(
    code: string,
    message: string,
): { error: true; code: string; message: string } {
    return { error: true, code, message };
}

// Validate error object
export function isValidError(err: any): boolean {
    return err && err.message && typeof err.message === 'string';
}
