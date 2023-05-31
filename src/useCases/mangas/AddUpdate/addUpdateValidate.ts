import { ObjectSchema, array, object, string } from "yup";
import { IAddUpdateDTO } from "./IAddUpdateDTO";

const addUpdateSchema: ObjectSchema<IAddUpdateDTO> = object({
  origin: string().required(),
  language: string().required(),
  populars: array(string()).required(),
  latest_updates: array(string()).required(),
});

export { addUpdateSchema };
