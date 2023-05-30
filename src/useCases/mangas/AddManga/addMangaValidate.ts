import { ObjectSchema, array, number, object, string } from "yup";
import { IChapter } from "../../../entities";
import { IAddMangaDTO } from "../../../useCases";
import { acceptedLanguages } from "../../../configs";

const chapterSchema: ObjectSchema<IChapter> = object({
  name: string().required(),
  pages: array(string().required()).required().min(1),
});

const addMangaSchema = object<IAddMangaDTO>({
  title: string().required(),
  alternative_title: string().required(),
  artist: string().nullable().defined(),
  author: string().nullable().defined(),
  genres: array(string()).required().min(1),
  status: string().nullable().defined(),
  url: string().required(),
  rating: number().nullable().positive().required(),
  language: string().oneOf(acceptedLanguages).required(),
  origin: string().required(),
  summary: string().nullable().defined(),
  thumbnail: string().required(),
  chapters: array().of(chapterSchema.required()).required(),
});

export { addMangaSchema };
