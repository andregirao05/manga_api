import { ObjectSchema, number, object, string } from "yup";
import { ISearchMangasDTO } from "./ISearchMangasDTO";
import { acceptedOrigins } from "../../../configs";

const searchMangasValidate: ObjectSchema<ISearchMangasDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
  searchTerm: string().required(),
  page: number().integer().positive().required(),
});

export { searchMangasValidate };
