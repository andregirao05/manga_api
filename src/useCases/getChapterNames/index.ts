import { mangaRespository } from "../../repositories";
import { GetChapterNamesUseCase } from "./GetChapterNamesUseCase";
import { GetChapterNamesController } from "./GetChapterNamesController";
import { validateId } from "../validateId";

const getChapterNamesUseCase = new GetChapterNamesUseCase(mangaRespository);
const getChapterNamesController = new GetChapterNamesController(getChapterNamesUseCase, validateId);

export { getChapterNamesController };