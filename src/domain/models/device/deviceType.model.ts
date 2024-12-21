
export class DeviceType {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    // Static factory method to create a DeviceType
    static create(value: string): DeviceType {
        if (!value) {
            throw new Error('DeviceType: value cannot be null or empty');
        }

        // Normalize the value to lowercase
        const normalizedValue = value.toLowerCase();

        // Check for valid device types
        if (['android', 'ios', 'web'].includes(normalizedValue)) {
            return new DeviceType(normalizedValue);
        } else {
            throw new Error('Invalid device type');
        }
    }

    // Getter for the value property
    getValue(): string {
        return this.value;
    }
}
