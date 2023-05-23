import { acceptedLanguages } from "../configs";
import { mangaRespository } from "../repositories";
import { GetGenreNamesController } from "../../infra/controllers";
import { GetGenreNamesUseCase } from "../../application/useCases";

const getGenreNamesUseCase = new GetGenreNamesUseCase(mangaRespository);
const getGenreNamesController = new GetGenreNamesController(
  getGenreNamesUseCase,
  acceptedLanguages
);

export { getGenreNamesController };
