import { ObjectSchema, number, object, string } from "yup";
import { acceptedOrigins } from "../../configs";
import { IGetLatestUpdatedMangasDTO } from "./IGetLatestUpdatedMangasDTO";

const getLatestUpdatedMangasSchema: ObjectSchema<IGetLatestUpdatedMangasDTO> =
  object({
    origin: string().oneOf(acceptedOrigins).required(),
    page: number().integer().positive().required(),
  });

export { getLatestUpdatedMangasSchema };
