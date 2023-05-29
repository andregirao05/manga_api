import { DataNotFoundError } from "./dataNotFound";

export class UpdateNotFoundError extends DataNotFoundError {
  constructor(public readonly origin: string) {
    super(`Update infos with origin ${origin}`);
    this.name = "UpdateNotFoundError";
  }
}
