import { mangaRespository } from "../../repositories";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";
import { GetMangasByGenreController } from "./GetMangasByGenreController";
import { validatePage } from "../../validate";

const getMangasByGenreUseCase = new GetMangasByGenreUseCase(mangaRespository);
const getMangasByGenreController = new GetMangasByGenreController(
  getMangasByGenreUseCase,
  validatePage
);

export { getMangasByGenreController };
export * from "./IGetMangasByGenreDTO";
