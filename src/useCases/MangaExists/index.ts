import { mangaRespository } from "../../repositories";
import { MangaExistsController } from "./MangaExistsController";
import { MangaExistsUseCase } from "./MangaExistsUseCase";

const mangaExistsUseCase = new MangaExistsUseCase(mangaRespository);
const mangaExistsController = new MangaExistsController(mangaExistsUseCase);

export { mangaExistsController };
export * from "./IMangaExistsDTO";
