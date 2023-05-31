export class InvalidAuthTokenError extends Error {
  constructor(private readonly token: string) {
    super(`Token ${token} is invalid.`);
    this.name = "InvalidAuthTokenError";
  }
}
