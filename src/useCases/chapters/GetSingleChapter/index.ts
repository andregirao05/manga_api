import { mangaRespository } from "repositories";
import { GetSingleChapterUseCase } from "./GetSingleChapterUseCase";
import { GetSingleChapterController } from "./GetSingleChapterController";
import { Validator } from "validation";
import { IGetSingleChapterDTO } from "./IGetSingleChapterDTO";
import { getSingleChapterSchema } from "./getSingleChapterSchema";

const getSingleChapterUseCase = new GetSingleChapterUseCase(mangaRespository);
const getSingleChapterValidator = new Validator<IGetSingleChapterDTO>(
  getSingleChapterSchema
);
const getSingleChapterController = new GetSingleChapterController(
  getSingleChapterUseCase,
  getSingleChapterValidator
);

export { getSingleChapterController };
export * from "./IGetSingleChapterDTO";
