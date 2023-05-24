import { mangaRespository } from "../../repositories";
import { GetMangaUseCase } from "./GetMangaUseCase";
import { GetMangaController } from "./GetMangaController";
import { validateId } from "../../validate";

const getMangaUseCase = new GetMangaUseCase(mangaRespository);
const getMangaController = new GetMangaController(getMangaUseCase, validateId);

export { getMangaController };
export * from "./IGetMangaDTO";
