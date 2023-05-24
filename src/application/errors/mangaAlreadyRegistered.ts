export class MangaAlreadyExist extends Error {
  constructor(public readonly id: string) {
    super(`The manga with ${id} is already registered.`);
    this.name = "MangaAlreadyExist";
  }
}
