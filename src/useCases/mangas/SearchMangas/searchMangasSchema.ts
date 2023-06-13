import { ObjectSchema, number, object, string } from "yup";
import { ISearchMangasDTO } from "./ISearchMangasDTO";
import { acceptedOrigins } from "configs";

const searchMangasSchema: ObjectSchema<ISearchMangasDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
  searchTerm: string().required().transform(prepareString),
  page: number().integer().positive().required(),
});

function prepareString(sentence: string): string {
  const preparedSentence = sentence.replace(/\s+/g, " ").trim().toLowerCase();
  return preparedSentence;
}

export { searchMangasSchema };
