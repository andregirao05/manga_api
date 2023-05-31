export class UpdateAlreadyRegisteredError extends Error {
  constructor(public readonly origin: string) {
    super(`The update info from ${origin} is already registered.`);
    this.name = "UpdateAlreadyRegisteredError";
  }
}
