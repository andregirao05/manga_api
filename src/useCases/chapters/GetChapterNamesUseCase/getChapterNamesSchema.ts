import { ObjectSchema, object, string } from "yup";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";

const getChapterNamesSchema: ObjectSchema<IGetChapterNamesDTO> = object({
  id: string()
    .required()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid id"),
});

export { getChapterNamesSchema };
