export interface IResponse<T = any> {
  statusCode: number;
  data: T | null;
  error: string | null;
}
