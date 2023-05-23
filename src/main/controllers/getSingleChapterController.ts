import { mangaRespository } from "../repositories";
import { GetSingleChapterUseCase } from "../../application/useCases";
import { GetSingleChapterController } from "../../infra/controllers";
import { validateId } from "../utils";

const getSingleChapterUseCase = new GetSingleChapterUseCase(mangaRespository);
const getSingleChapterController = new GetSingleChapterController(
  getSingleChapterUseCase,
  validateId
);

export { getSingleChapterController };
