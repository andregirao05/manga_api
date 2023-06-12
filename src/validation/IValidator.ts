export interface IValidator<T> {
  validate(data: any): Promise<T>;
}
