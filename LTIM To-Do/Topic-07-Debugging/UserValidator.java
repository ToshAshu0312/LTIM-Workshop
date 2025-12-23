public class UserValidator {
    public static void validateEmail(String email) {
        // Fixed: Added null check
        if (email == null || email.isEmpty()) {
            System.out.println("Email is invalid (null or empty)");
            return;
        }
        if (email.contains("@")) {
            System.out.println("Email is valid");
        } else {
            System.out.println("Email is invalid");
        }
    }

    public static void main(String[] args) {
        String userEmail = null;
        validateEmail(userEmail);
    }
}
