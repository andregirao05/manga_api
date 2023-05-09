import { mangaRespository } from "../../repositories";
import { GetSingleChapterUseCase } from "./GetSingleChapterUseCase";
import { GetSingleChapterController } from "./GetSingleChapterController";
import { validateId } from "../validateId";

const getSingleChapterUseCase = new GetSingleChapterUseCase(mangaRespository);
const getSingleChapterController = new GetSingleChapterController(getSingleChapterUseCase, validateId);

export { getSingleChapterController };
