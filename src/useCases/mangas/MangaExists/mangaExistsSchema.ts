import { ObjectSchema, object, string } from "yup";
import { IMangaExistsDTO } from "./IMangaExistsDTO";

const mangaExistsSchema: ObjectSchema<IMangaExistsDTO> = object({
  url: string().required(),
});

export { mangaExistsSchema };
