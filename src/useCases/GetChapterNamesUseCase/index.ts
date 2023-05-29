import { mangaRespository } from "../../repositories";
import { GetChapterNamesUseCase } from "./GetChapterNamesUseCase";
import { GetChapterNamesController } from "./GetChapterNamesController";

const getChapterNamesUseCase = new GetChapterNamesUseCase(mangaRespository);
const getChapterNamesController = new GetChapterNamesController(
  getChapterNamesUseCase
);

export { getChapterNamesController };
export * from "./IGetChapterNamesDTO";
