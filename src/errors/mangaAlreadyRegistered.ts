export class MangaAlreadyExist extends Error {
  constructor(public readonly id: string) {
    super(`The manga is already registered. Id: ${id}`);
    this.name = "MangaAlreadyExist";
  }
}
