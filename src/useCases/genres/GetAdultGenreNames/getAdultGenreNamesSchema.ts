import { ObjectSchema, object, string } from "yup";
import { IGetAdultGenreNamesDTO } from "./IGetAdultGenreNamesDTO";
import { acceptedOrigins } from "configs";

const getAdultGenreNamesSchema: ObjectSchema<IGetAdultGenreNamesDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
});

export { getAdultGenreNamesSchema };
