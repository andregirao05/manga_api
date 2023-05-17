import { mangaRespository } from "../../repositories";
import { validatePage } from "../validatePage";
import { GetMangasByGenreController } from "./GetMangasByGenreController";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";

const getMangasByGenreUseCase = new GetMangasByGenreUseCase(mangaRespository);
const getMangasByGenreController = new GetMangasByGenreController(
  getMangasByGenreUseCase,
  validatePage
);

export { getMangasByGenreController };
