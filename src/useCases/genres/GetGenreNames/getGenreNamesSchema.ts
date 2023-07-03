import { ObjectSchema, object, string } from "yup";
import { IGetGenreNamesDTO } from "./IGetGenreNamesDTO";
import { acceptedOrigins } from "configs";

const getGenreNamesSchema: ObjectSchema<IGetGenreNamesDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
});

export { getGenreNamesSchema };
