import { ObjectSchema, object, string } from "yup";
import { IGetGenreNamesDTO } from "./IGetGenreNamesDTO";
import { acceptedLanguages } from "../../configs";

const getGenreNamesSchema: ObjectSchema<IGetGenreNamesDTO> = object({
  language: string().oneOf(acceptedLanguages).required(),
});

export { getGenreNamesSchema };
