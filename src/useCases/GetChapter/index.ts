import { mangaRespository } from "../../repositories";
import { GetChaptersUseCase } from "./GetChapterUseCase";
import { GetChaptersController } from "./GetChaptersController";
import { validateId } from "../../validate";

const getChaptersUseCase = new GetChaptersUseCase(mangaRespository);
const getChaptersController = new GetChaptersController(
  getChaptersUseCase,
  validateId
);

export * from "./IGetChaptersDTO";
export { getChaptersController };
