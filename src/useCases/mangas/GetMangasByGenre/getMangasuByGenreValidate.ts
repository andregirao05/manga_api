import { ObjectSchema, number, object, string } from "yup";
import { IGetMangasByGenreDTO } from "./IGetMangasByGenreDTO";

const getMangasByGenreValidate: ObjectSchema<IGetMangasByGenreDTO> = object({
  genreName: string().required(),
  page: number().integer().positive().required(),
});

export { getMangasByGenreValidate };
