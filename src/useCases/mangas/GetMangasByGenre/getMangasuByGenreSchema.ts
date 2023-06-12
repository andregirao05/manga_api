import { ObjectSchema, number, object, string } from "yup";
import { IGetMangasByGenreDTO } from "./IGetMangasByGenreDTO";
import { acceptedOrigins } from "configs";

const getMangasByGenreSchema: ObjectSchema<IGetMangasByGenreDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
  genreName: string().required(),
  page: number().integer().positive().required(),
});

export { getMangasByGenreSchema };
