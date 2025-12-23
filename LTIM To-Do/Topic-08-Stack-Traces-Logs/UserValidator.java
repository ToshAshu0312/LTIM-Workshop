public class UserValidator {
    public static void validateEmail(String email) {
        // BUG: Removed null check - will cause NullPointerException
        if (email.contains("@")) {
            System.out.println("Email is valid");
        } else {
            System.out.println("Email is invalid");
        }
    }
}
