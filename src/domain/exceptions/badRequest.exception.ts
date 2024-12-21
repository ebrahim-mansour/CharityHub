export default class BadRequestException extends Error {
    constructor(description: string) {
      super(`Bad Request: ${description || ""}`);
      this.name = "BadRequestException";
    }
  }
  