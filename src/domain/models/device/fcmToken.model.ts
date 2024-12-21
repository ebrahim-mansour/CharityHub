import { ValueValidator } from '../../validators/valueValidator.validator';

export class FCMToken {
    private readonly value: string;

    private constructor(value: string) {
        // Validate that the value is not empty
        ValueValidator.assertNotEmpty(value, 'FCMToken');
        this.value = value;
    }

    // Static factory method to create an FCMToken
    static create(value: string): FCMToken {
        return new FCMToken(value);
    }

    // Getter for the value property
    getValue(): string {
        return this.value;
    }

    // Override equals method
    equals(other: FCMToken): boolean {
        if (!other || !(other instanceof FCMToken)) return false;
        return this.value === other.value;
    }

    // Override hashCode equivalent in TypeScript
    hashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.value.length; i++) {
            const char = this.value.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32-bit integer
        }
        return hash;
    }

    // Override toString
    toString(): string {
        return `FCMToken { value: '${this.value}' }`;
    }
}
