import { ValueValidator } from "../../validators/valueValidator.validator";

export default class PhotoUrl {
  private static readonly URL_PATTERN =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
  private value: string;

  private constructor(value: string) {
    this.value = value;
    ValueValidator.assertNotEmpty(value, PhotoUrl.name);
    ValueValidator.assertValidFormat(
      value,
      PhotoUrl.URL_PATTERN,
      PhotoUrl.name
    );
  }

  public static create(value: string): PhotoUrl {
    return new PhotoUrl(value);
  }

  public getValue(): string {
    return this.value;
  }
}
