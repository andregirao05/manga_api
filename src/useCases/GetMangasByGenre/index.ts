import { mangaRespository } from "../../repositories";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";
import { GetMangasByGenreController } from "./GetMangasByGenreController";

const getMangasByGenreUseCase = new GetMangasByGenreUseCase(mangaRespository);
const getMangasByGenreController = new GetMangasByGenreController(
  getMangasByGenreUseCase
);

export { getMangasByGenreController };
export * from "./IGetMangasByGenreDTO";
