import { ObjectSchema, array, object, string } from "yup";
import { acceptedOrigins } from "configs";
import { IAddRecommendationsDTO } from "./IAddRecommendationsDTO";

const addRecommendationsSchema: ObjectSchema<IAddRecommendationsDTO> = object({
  origin: string().oneOf(acceptedOrigins).required(),
  ids: array(string().matches(/^[0-9a-fA-F]{24}$/))
    .required()
    .transform((ids) => Array.from(new Set(ids)))
    .min(1),
});

export { addRecommendationsSchema };
