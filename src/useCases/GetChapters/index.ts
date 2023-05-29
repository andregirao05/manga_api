import { mangaRespository } from "../../repositories";
import { GetChaptersUseCase } from "./GetChapterUseCase";
import { GetChaptersController } from "./GetChaptersController";

const getChaptersUseCase = new GetChaptersUseCase(mangaRespository);
const getChaptersController = new GetChaptersController(getChaptersUseCase);

export * from "./IGetChaptersDTO";
export { getChaptersController };
