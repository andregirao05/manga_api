import { ObjectSchema, object, string } from "yup";
import { IGetUpdateDTO } from "./IGetUpdateDTO";

const getUpdateSchema: ObjectSchema<IGetUpdateDTO> = object({
  origin: string().required(),
});

export { getUpdateSchema };
