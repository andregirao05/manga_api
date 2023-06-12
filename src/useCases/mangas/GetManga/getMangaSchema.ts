import { ObjectSchema, object, string } from "yup";
import { IGetMangaDTO } from "./IGetMangaDTO";

const getMangaSchema: ObjectSchema<IGetMangaDTO> = object({
  id: string()
    .required()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid id"),
});

export { getMangaSchema };
