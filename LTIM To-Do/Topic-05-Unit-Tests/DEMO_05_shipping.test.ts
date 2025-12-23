import { calculateShipping } from './DEMO_05_shipping';

describe('calculateShipping', () => {
    // Valid cases - Normal operation
    describe('Valid cases', () => {
        test('should calculate shipping for standard weight and distance', () => {
            const result = calculateShipping(10, 100);
            expect(result).toBe(15); // (10 * 0.5) + (100 * 0.1) = 5 + 10 = 15
        });

        test('should calculate shipping for small weight and distance', () => {
            const result = calculateShipping(1, 10);
            expect(result).toBe(1.5); // (1 * 0.5) + (10 * 0.1) = 0.5 + 1 = 1.5
        });

        test('should calculate shipping for large weight and distance', () => {
            const result = calculateShipping(1000, 5000);
            expect(result).toBe(1000); // (1000 * 0.5) + (5000 * 0.1) = 500 + 500 = 1000
        });

        test('should calculate shipping for fractional weight and distance', () => {
            const result = calculateShipping(2.5, 15.75);
            expect(result).toBeCloseTo(2.825); // (2.5 * 0.5) + (15.75 * 0.1) = 1.25 + 1.575 = 2.825
        });

        test('should handle very precise decimal values', () => {
            const result = calculateShipping(0.123, 0.456);
            expect(result).toBeCloseTo(0.10716); // (0.123 * 0.5) + (0.456 * 0.1)
        });
    });

    // Edge cases
    describe('Edge cases', () => {
        test('should handle very small positive weight and distance', () => {
            const result = calculateShipping(0.001, 0.001);
            expect(result).toBeCloseTo(0.0006); // (0.001 * 0.5) + (0.001 * 0.1)
        });

        test('should handle very large weight', () => {
            const result = calculateShipping(1000000, 10);
            expect(result).toBe(500001); // (1000000 * 0.5) + (10 * 0.1)
        });

        test('should handle very large distance', () => {
            const result = calculateShipping(10, 1000000);
            expect(result).toBe(100005); // (10 * 0.5) + (1000000 * 0.1)
        });

        test('should handle when weight equals distance', () => {
            const result = calculateShipping(100, 100);
            expect(result).toBe(60); // (100 * 0.5) + (100 * 0.1) = 50 + 10 = 60
        });

        test('should handle minimum practical values', () => {
            const result = calculateShipping(0.01, 0.01);
            expect(result).toBeCloseTo(0.006); // (0.01 * 0.5) + (0.01 * 0.1)
        });
    });

    // Boundary tests
    describe('Boundary tests', () => {
        test('should reject weight of exactly zero', () => {
            expect(() => calculateShipping(0, 100)).toThrow('Weight and distance must be greater than 0');
        });

        test('should reject distance of exactly zero', () => {
            expect(() => calculateShipping(100, 0)).toThrow('Weight and distance must be greater than 0');
        });

        test('should reject both weight and distance as zero', () => {
            expect(() => calculateShipping(0, 0)).toThrow('Weight and distance must be greater than 0');
        });

        test('should accept weight just above zero', () => {
            const result = calculateShipping(0.0001, 10);
            expect(result).toBeCloseTo(1.00005); // (0.0001 * 0.5) + (10 * 0.1)
        });

        test('should accept distance just above zero', () => {
            const result = calculateShipping(10, 0.0001);
            expect(result).toBeCloseTo(5.00001); // (10 * 0.5) + (0.0001 * 0.1)
        });
    });

    // Error handling - Negative values
    describe('Error handling - Negative values', () => {
        test('should throw error for negative weight', () => {
            expect(() => calculateShipping(-10, 100)).toThrow('Weight and distance must be greater than 0');
        });

        test('should throw error for negative distance', () => {
            expect(() => calculateShipping(10, -100)).toThrow('Weight and distance must be greater than 0');
        });

        test('should throw error for both negative weight and distance', () => {
            expect(() => calculateShipping(-10, -100)).toThrow('Weight and distance must be greater than 0');
        });

        test('should throw error for very small negative weight', () => {
            expect(() => calculateShipping(-0.001, 100)).toThrow('Weight and distance must be greater than 0');
        });

        test('should throw error for very small negative distance', () => {
            expect(() => calculateShipping(100, -0.001)).toThrow('Weight and distance must be greater than 0');
        });
    });

    // Error handling - Non-finite numbers
    describe('Error handling - Non-finite numbers', () => {
        test('should throw error for weight as Infinity', () => {
            expect(() => calculateShipping(Infinity, 100)).toThrow('Weight and distance must be valid numbers');
        });

        test('should throw error for distance as Infinity', () => {
            expect(() => calculateShipping(100, Infinity)).toThrow('Weight and distance must be valid numbers');
        });

        test('should throw error for weight as negative Infinity', () => {
            expect(() => calculateShipping(-Infinity, 100)).toThrow('Weight and distance must be greater than 0');
        });

        test('should throw error for distance as negative Infinity', () => {
            expect(() => calculateShipping(100, -Infinity)).toThrow('Weight and distance must be greater than 0');
        });

        test('should throw error for weight as NaN', () => {
            expect(() => calculateShipping(NaN, 100)).toThrow('Weight and distance must be valid numbers');
        });

        test('should throw error for distance as NaN', () => {
            expect(() => calculateShipping(100, NaN)).toThrow('Weight and distance must be valid numbers');
        });

        test('should throw error for both weight and distance as Infinity', () => {
            expect(() => calculateShipping(Infinity, Infinity)).toThrow('Weight and distance must be valid numbers');
        });

        test('should throw error for both weight and distance as NaN', () => {
            expect(() => calculateShipping(NaN, NaN)).toThrow('Weight and distance must be valid numbers');
        });
    });

    // Combined scenarios
    describe('Combined scenarios', () => {
        test('should handle high weight with low distance', () => {
            const result = calculateShipping(1000, 1);
            expect(result).toBe(500.1); // (1000 * 0.5) + (1 * 0.1)
        });

        test('should handle low weight with high distance', () => {
            const result = calculateShipping(1, 1000);
            expect(result).toBe(100.5); // (1 * 0.5) + (1000 * 0.1)
        });

        test('should produce consistent results for same inputs', () => {
            const result1 = calculateShipping(50, 200);
            const result2 = calculateShipping(50, 200);
            expect(result1).toBe(result2);
        });

        test('should handle multiple decimal places accurately', () => {
            const result = calculateShipping(12.345, 67.89);
            expect(result).toBeCloseTo(12.9615); // (12.345 * 0.5) + (67.89 * 0.1)
        });
    });
});
