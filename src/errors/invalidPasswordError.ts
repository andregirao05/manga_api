export class InvalidPasswordError extends Error {
  constructor() {
    super("Password is invalid");
    this.name = "InvalidPasswordError";
  }
}
