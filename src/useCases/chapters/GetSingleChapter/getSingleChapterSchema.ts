import { ObjectSchema, object, string } from "yup";
import { IGetSingleChapterDTO } from "./IGetSingleChapterDTO";

const getSingleChapterSchema: ObjectSchema<IGetSingleChapterDTO> = object({
  id: string()
    .required()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid id"),
  chapterName: string().required(),
});

export { getSingleChapterSchema };
