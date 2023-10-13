import { mangaRespository } from "repositories";
import { GetAdultGenreNamesUseCase } from "./GetAdultGenreNamesUseCase";
import { GetAdultGenreNamesController } from "./GetAdultGenreNamesController";
import { Validator } from "validation";
import { IGetAdultGenreNamesDTO } from "./IGetAdultGenreNamesDTO";
import { getAdultGenreNamesSchema } from "./getAdultGenreNamesSchema";

const getAdultGenreNamesUseCase = new GetAdultGenreNamesUseCase(
  mangaRespository
);
const getAdultGenreNamesValidator = new Validator<IGetAdultGenreNamesDTO>(
  getAdultGenreNamesSchema
);
const getAdultGenreNamesController = new GetAdultGenreNamesController(
  getAdultGenreNamesUseCase,
  getAdultGenreNamesValidator
);

export { getAdultGenreNamesController };
export * from "./IGetAdultGenreNamesDTO";
