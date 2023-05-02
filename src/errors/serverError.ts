export class ServerError extends Error {
  constructor(stack: string) {
    super("Internal server error");
    console.log(this.message);
    this.name = "ServerError";
    this.stack = stack;
  }
}
