import { ObjectSchema, array, object, string } from "yup";
import { IChapter } from "../../entities";
import { IAddChaptersDTO } from "./IAddChaptersDTO";

const chapterSchema: ObjectSchema<IChapter> = object({
  name: string().required(),
  pages: array(string().required()).required().min(1),
});

const addChaptersSchema = object<IAddChaptersDTO>({
  id: string()
    .required()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid id"),
  chapters: array(chapterSchema).required().min(1),
});

export { addChaptersSchema };
