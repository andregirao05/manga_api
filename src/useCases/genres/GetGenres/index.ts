import { mangaRespository } from "repositories";
import { GetGenresUseCase } from "./GetGenresUseCase";
import { GetGenresController } from "./GetGenresController";
import { Validator } from "validation";
import { IGetGenresDTO } from "./IGetGenresDTO";
import { getGenresSchema } from "./getGenresSchema";

const getGenresUseCase = new GetGenresUseCase(mangaRespository);
const getGenreNamesValidator = new Validator<IGetGenresDTO>(getGenresSchema);
const getGenresController = new GetGenresController(
  getGenresUseCase,
  getGenreNamesValidator
);

export { getGenresController };
export * from "./IGetGenresDTO";
