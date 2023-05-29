import { mangaRespository } from "../../repositories";
import { GetSingleChapterUseCase } from "./GetSingleChapterUseCase";
import { GetSingleChapterController } from "./GetSingleChapterController";

const getSingleChapterUseCase = new GetSingleChapterUseCase(mangaRespository);
const getSingleChapterController = new GetSingleChapterController(
  getSingleChapterUseCase
);

export { getSingleChapterController };
export * from "./IGetSingleChapterDTO";
