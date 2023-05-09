import { acceptedLanguages } from "../../configs";
import { mangaRespository } from "../../repositories";
import { GetGenreNamesController } from "./GetGenreNamesController";
import { GetGenreNamesUseCase } from "./GetGenreNamesUseCase";

const getGenreNamesUseCase = new GetGenreNamesUseCase(mangaRespository)
const getGenreNamesController = new GetGenreNamesController(getGenreNamesUseCase, acceptedLanguages)

export { getGenreNamesController }