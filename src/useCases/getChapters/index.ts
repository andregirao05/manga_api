import { mangaRespository } from "../../repositories";
import { GetChaptersUseCase } from "./GetChapterUseCase";
import { GetChaptersController } from "./GetChaptersController";
import { validateId } from "../validateId";

const getChaptersUseCase = new GetChaptersUseCase(mangaRespository);
const getChaptersController = new GetChaptersController(getChaptersUseCase, validateId);

export { getChaptersController };