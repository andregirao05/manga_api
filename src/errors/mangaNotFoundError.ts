import { DataNotFoundError } from "./dataNotFoundError";

export class MangaNotFoundError extends DataNotFoundError {
  constructor(public readonly id: string) {
    super(`Manga with id ${id}`);
    this.name = "MangaNotFoundError";
  }
}
