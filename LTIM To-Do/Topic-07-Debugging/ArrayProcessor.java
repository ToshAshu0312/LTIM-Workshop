public class ArrayProcessor {
    public static int sumArray(int[] numbers) {
        int total = 0;
        for (int i = 0; i < numbers.length; i++) {  // Fixed: Changed <= to <
            total += numbers[i];
        }
        return total;
    }

    public static void main(String[] args) {
        int[] values = {10, 20, 30, 40};
        int result = sumArray(values);
        System.out.println("Sum: " + result);
    }
}
