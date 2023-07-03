import { IAddUpdateDTO, ISetUpdateDTO, IGetUpdateDTO } from "useCases";
import { IUpdate } from "entities";

export interface IInformationsRepository {
  add(data: IAddUpdateDTO): Promise<string>;
  get(data: IGetUpdateDTO): Promise<IUpdate>;
  set(data: ISetUpdateDTO): Promise<boolean>;

  exists(origin: string): Promise<boolean>;
}
