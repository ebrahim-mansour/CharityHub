import BadRequestException from "../exceptions/badRequest.exception";

export class ValueValidator {
  static assertNotEmpty(
    value: string | null | undefined,
    className: string
  ): void {
    if (!value || value.trim().length === 0) {
      throw new BadRequestException(`${className} cannot be empty`);
    }
  }

  static assertWithinRange(
    className: string,
    value: string,
    minLength: number,
    maxLength: number
  ): void {
    if (value.length < minLength || value.length > maxLength) {
      throw new BadRequestException(
        `${className} must be between ${minLength} and ${maxLength} characters`
      );
    }
  }

  static assertValidFormat(
    value: string,
    pattern: RegExp,
    className: string
  ): void {
    if (!pattern.test(value)) {
      throw new BadRequestException(`${className} has an invalid format`);
    }
  }
}
