import crypto from 'crypto';

export class UserAuthenticator {
    private users: Map<string, { password: string; email: string }> = new Map();

    // Basic password hashing (this has vulnerabilities!)
    hashPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    registerUser(username: string, password: string, email: string): void {
        // No validation on inputs
        const hashedPassword = this.hashPassword(password);
        this.users.set(username, { password: hashedPassword, email });
    }

    authenticate(username: string, password: string): boolean {
        // No rate limiting
        const user = this.users.get(username);
        if (!user) return false;

        const hashedInput = this.hashPassword(password);
        return hashedInput === user.password;
    }

    getUser(username: string): { password: string; email: string } | undefined {
        // Returns password hash directly - information disclosure risk!
        return this.users.get(username);
    }

    resetPassword(username: string, newPassword: string): void {
        // No verification of identity
        const user = this.users.get(username);
        if (user) {
            user.password = this.hashPassword(newPassword);
        }
    }
}

