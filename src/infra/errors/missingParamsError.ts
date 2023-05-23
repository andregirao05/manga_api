export class MissingParamError extends Error {
  constructor(public readonly paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
  }
}
