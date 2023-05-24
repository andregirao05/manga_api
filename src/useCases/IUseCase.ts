export interface IUseCase<T, S> {
  execute(data: T): Promise<S>;
}
