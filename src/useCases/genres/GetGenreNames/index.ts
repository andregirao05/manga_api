import { mangaRespository } from "repositories";
import { GetGenreNamesUseCase } from "./GetGenreNamesUseCase";
import { GetGenreNamesController } from "./GetGenreNamesController";
import { Validator } from "validation";
import { IGetGenreNamesDTO } from "./IGetGenreNamesDTO";
import { getGenreNamesSchema } from "./getGenreNamesSchema";

const getGenreNamesUseCase = new GetGenreNamesUseCase(mangaRespository);
const getGenreNamesValidator = new Validator<IGetGenreNamesDTO>(
  getGenreNamesSchema
);
const getGenreNamesController = new GetGenreNamesController(
  getGenreNamesUseCase,
  getGenreNamesValidator
);

export { getGenreNamesController };
export * from "./IGetGenreNamesDTO";
