import { ValueValidator } from "../../validators/valueValidator.validator";

export default class MobileNumber {
  private static readonly MIN_LENGTH = 7;
  private static readonly MAX_LENGTH = 15;
  private static readonly MOBILE_PATTERN = /^[0-9]*$/;

  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
    this.validate(value);
  }

  private validate(value: string): void {
    ValueValidator.assertWithinRange(MobileNumber.name, value, MobileNumber.MIN_LENGTH, MobileNumber.MAX_LENGTH);
    ValueValidator.assertValidFormat(value, MobileNumber.MOBILE_PATTERN, MobileNumber.name);
  }

  public static of(value: string): MobileNumber {
    let modifiedNumber = value;

    if (modifiedNumber.startsWith("00")) {
      modifiedNumber = modifiedNumber.replace("00", "");
    }

    if (modifiedNumber.startsWith("+")) {
      modifiedNumber = modifiedNumber.replace("+", "");
    }

    return new MobileNumber(modifiedNumber);
  }

  public getValue(): string {
    return this.value;
  }
}
