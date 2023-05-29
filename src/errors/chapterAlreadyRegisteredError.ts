export class ChapterAlreadyExistError extends Error {
  constructor(public readonly name: string) {
    super(`The chapter ${name} is already registered.`);
    this.name = "ChapterAlreadyExist";
  }
}
