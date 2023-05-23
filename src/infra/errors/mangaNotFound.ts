import { DataNotFoundError } from "./dataNotFound";

export class MangaNotFound extends DataNotFoundError {
  constructor(public readonly id: string) {
    super(`Manga with id "${id}"`);
    this.name = "MangaNotFound";
  }
}
