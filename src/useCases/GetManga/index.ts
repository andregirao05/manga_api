import { mangaRespository } from "../../repositories";
import { GetMangaUseCase } from "./GetMangaUseCase";
import { GetMangaController } from "./GetMangaController";

const getMangaUseCase = new GetMangaUseCase(mangaRespository);
const getMangaController = new GetMangaController(getMangaUseCase);

export { getMangaController };
export * from "./IGetMangaDTO";
