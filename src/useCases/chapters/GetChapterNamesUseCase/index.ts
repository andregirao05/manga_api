import { chapterRespository } from "repositories";
import { GetChapterNamesUseCase } from "./GetChapterNamesUseCase";
import { GetChapterNamesController } from "./GetChapterNamesController";
import { Validator } from "validation";
import { IGetChapterNamesDTO } from "./IGetChapterNamesDTO";
import { getChapterNamesSchema } from "./getChapterNamesSchema";

const getChapterNamesUseCase = new GetChapterNamesUseCase(chapterRespository);
const getChaptersValidator = new Validator<IGetChapterNamesDTO>(
  getChapterNamesSchema
);
const getChapterNamesController = new GetChapterNamesController(
  getChapterNamesUseCase,
  getChaptersValidator
);

export { getChapterNamesController };
export * from "./IGetChapterNamesDTO";
