import { DataNotFoundError } from "./dataNotFound";

export class UserNotFoundError extends DataNotFoundError {
  constructor(public readonly username: string) {
    super(`User ${username}`);
    this.name = "UserNotFoundError";
  }
}
