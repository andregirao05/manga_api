import { mangaRespository } from "repositories";
import { Validator } from "validation";
import { GetRecommendationsUseCase } from "./GetRecommendationsUseCase";
import { IGetRecommendationsDTO } from "./IGetRecommendationsDTO";
import { getRecommendationsSchema } from "./GetRecommendationsSchema";
import { GetRecommendationsController } from "./GetRecommendationsController";

const getRecommendationsUseCase = new GetRecommendationsUseCase(
  mangaRespository
);

const getRecommendationsValidator = new Validator<IGetRecommendationsDTO>(
  getRecommendationsSchema
);

const getRecommendationsController = new GetRecommendationsController(
  getRecommendationsUseCase,
  getRecommendationsValidator
);

export { getRecommendationsController };

export * from "./IGetRecommendationsDTO";
