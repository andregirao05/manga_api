import { IResponse } from "./IResponse";
import { IRequest } from "./IResquest";

export interface IController<T = any> {
  handle(request: IRequest): Promise<IResponse<T>>;
}
