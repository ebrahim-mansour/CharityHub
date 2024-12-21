import { ValueValidator } from '../../validators/valueValidator.validator';

export class DeviceId {
    private readonly value: string;
    private static readonly MIN_LENGTH = 15;
    private static readonly MAX_LENGTH = 50;

    private constructor(value: string) {
        // Perform validation on creation
        ValueValidator.assertWithinRange('DeviceId', value, DeviceId.MIN_LENGTH, DeviceId.MAX_LENGTH);
        this.value = value;
    }

    // Static factory method to create a DeviceId
    static create(value: string): DeviceId {
        return new DeviceId(value);
    }

    // Getter for the value property
    getValue(): string {
        return this.value;
    }
}
