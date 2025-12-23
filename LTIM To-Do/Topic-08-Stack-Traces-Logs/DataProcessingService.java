public class DataProcessingService {
    public static void main(String[] args) {
        try {
            processData();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        Thread thread1 = new Thread(() -> {
            try {
                calculateMetrics();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        
        Thread thread2 = new Thread(() -> {
            try {
                validateInput();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        
        thread1.start();
        thread2.start();
    }
    
    public static void processData() {
        int[] numbers = {10, 20, 30, 40};
        ArrayProcessor.sumArray(numbers);
    }
    
    public static void calculateMetrics() {
        int[] divisors = {100, 50, 0, 25};
        for (int divisor : divisors) {
            DivisionCalculator.divide(1000, divisor);
        }
    }
    
    public static void validateInput() {
        String userEmail = null;
        UserValidator.validateEmail(userEmail);
    }
}
