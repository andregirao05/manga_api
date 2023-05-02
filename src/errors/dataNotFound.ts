export class DataNotFoundError extends Error {
  constructor(public readonly notFoundData: string) {
    super(`${notFoundData} not found.`);
  }
}
