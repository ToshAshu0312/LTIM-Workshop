public class DivisionCalculator {
    public static double divide(int numerator, int denominator) {
        if (denominator == 0) {
            throw new ArithmeticException("Cannot divide by zero");  // BUG: Throws exception
        }
        return numerator / (double) denominator;
    }

    public static void main(String[] args) {
        int[] numbers = {100, 50, 0, 25};
        for (int num : numbers) {
            try {
                double result = divide(1000, num);
                System.out.println("1000 / " + num + " = " + result);
            } catch (ArithmeticException e) {
                System.out.println("1000 / " + num + " = Error: " + e.getMessage());
            }
        }
    }
}
