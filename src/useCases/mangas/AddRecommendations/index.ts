import { mangaRespository } from "repositories";
import { Validator } from "validation";
import { AddRecommendationsUseCase } from "./AddRecommendationsUseCase";
import { IAddRecommendationsDTO } from "./IAddRecommendationsDTO";
import { addRecommendationsSchema } from "./AddRecommentationsSchema";
import { AddRecommendationsController } from "./AddRecommendationsController";

const addRecommendationsUseCase = new AddRecommendationsUseCase(
  mangaRespository
);

const addRecommendationsValidator = new Validator<IAddRecommendationsDTO>(
  addRecommendationsSchema
);

const addRecommendationsController = new AddRecommendationsController(
  addRecommendationsUseCase,
  addRecommendationsValidator
);

export { addRecommendationsController };

export * from "./IAddRecommendationsDTO";
