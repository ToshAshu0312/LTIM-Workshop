public class ArrayProcessor {
    public static int sumArray(int[] numbers) {
        int total = 0;
        for (int i = 0; i <= numbers.length; i++) {  // BUG: Off-by-one error
            total += numbers[i];
        }
        return total;
    }
}
