import { ValueValidator } from "../../validators/valueValidator.validator";

export default class FullName {
  private static readonly MIN_LENGTH = 2;
  private static readonly MAX_LENGTH = 50;
  private value: string;

  private constructor(value: string) {
    this.value = value;
    this.validate(value);
  }

  private validate(value: string): void {
    ValueValidator.assertWithinRange(
      FullName.name,
      value,
      FullName.MIN_LENGTH,
      FullName.MAX_LENGTH
    );
  }

  public static create(value: string): FullName {
    return new FullName(value);
  }
}
