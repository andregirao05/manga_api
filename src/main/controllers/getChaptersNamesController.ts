import { mangaRespository } from "../repositories";
import { GetChapterNamesUseCase } from "../../application/useCases";
import { GetChapterNamesController } from "../../infra/controllers";
import { validateId } from "../utils";

const getChapterNamesUseCase = new GetChapterNamesUseCase(mangaRespository);
const getChapterNamesController = new GetChapterNamesController(
  getChapterNamesUseCase,
  validateId
);

export { getChapterNamesController };
