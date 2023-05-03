export class InvalidParamError extends Error {
  constructor(public readonly paramName: string) {
    super(`Param ${paramName} is invalid.`);
    this.name = "InvalidParamError";
  }
}
