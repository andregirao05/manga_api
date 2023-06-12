import { ObjectSchema, array, object, string } from "yup";
import { ISetUpdateDTO } from "./ISetUpdateDTO";

const setUpdateSchema: ObjectSchema<ISetUpdateDTO> = object({
  origin: string().required(),
  language: string().required(),
  populars: array(string()).required(),
  latest_updates: array(string()).required(),
});

export { setUpdateSchema };
