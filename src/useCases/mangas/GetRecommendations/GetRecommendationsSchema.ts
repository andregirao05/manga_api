import { ObjectSchema, number, object, string } from "yup";
import { acceptedOrigins } from "configs";
import { IGetRecommendationsDTO } from "./IGetRecommendationsDTO";

const getRecommendationsSchema: ObjectSchema<IGetRecommendationsDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
  page: number().integer().positive().required(),
});

export { getRecommendationsSchema };
