export function calculateShipping(weight: number, distance: number): number {
    // Validation
    if (weight <= 0 || distance <= 0) {
        throw new Error('Weight and distance must be greater than 0');
    }

    if (!Number.isFinite(weight) || !Number.isFinite(distance)) {
        throw new Error('Weight and distance must be valid numbers');
    }

    // Calculation: $0.50 per pound + $0.10 per mile
    const baseCost = weight * 0.5;
    const distanceCost = distance * 0.1;

    return baseCost + distanceCost;
}
