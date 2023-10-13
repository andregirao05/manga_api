import { ObjectSchema, object, string } from "yup";
import { IGetGenresDTO } from "./IGetGenresDTO";
import { acceptedOrigins } from "configs";

const getGenresSchema: ObjectSchema<IGetGenresDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
});

export { getGenresSchema };
