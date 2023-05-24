import { acceptedLanguages } from "../../configs";
import { mangaRespository } from "../../repositories";
import { GetGenreNamesUseCase } from "./GetGenreNamesUseCase";
import { GetGenreNamesController } from "./GetGenreNamesController";

const getGenreNamesUseCase = new GetGenreNamesUseCase(mangaRespository);
const getGenreNamesController = new GetGenreNamesController(
  getGenreNamesUseCase,
  acceptedLanguages
);

export { getGenreNamesController };
export * from "./IGetGenreNamesDTO";
