import { ValueValidator } from '../../validators/valueValidator.validator';

export class RefreshToken {
    private readonly value: string;

    private constructor(value: string) {
        // Validate that the value is not empty
        ValueValidator.assertNotEmpty(value, 'RefreshToken');
        this.value = value;
    }

    // Static factory method to create a RefreshToken
    static create(value: string): RefreshToken {
        return new RefreshToken(value);
    }

    // Getter for the value property
    getValue(): string {
        return this.value;
    }

    // Override equals method
    equals(other: RefreshToken): boolean {
        if (!other || !(other instanceof RefreshToken)) return false;
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
        return `RefreshToken { value: '${this.value}' }`;
    }
}
