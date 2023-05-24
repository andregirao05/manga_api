export class MissingParamError extends Error {
  constructor(public readonly params: string[]) {
    super(`Missing param: ${params.join(", ")}.`);
    this.name = "MissingParamError";
  }
}
