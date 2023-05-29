import { ObjectSchema, number, object, string } from "yup";
import { IGetPopularMangasDTO } from "./IGetPopularMangasDTO";
import { acceptedOrigins } from "../../configs";

const getPopularMangasSchema: ObjectSchema<IGetPopularMangasDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
  page: number().integer().positive().required(),
});

export { getPopularMangasSchema };
