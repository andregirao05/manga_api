import { ObjectSchema, object, string } from "yup";
import { IGetChaptersDTO } from "./IGetChaptersDTO";

const getChaptersSchema: ObjectSchema<IGetChaptersDTO> = object({
  id: string()
    .required()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid id"),
});

export { getChaptersSchema };
