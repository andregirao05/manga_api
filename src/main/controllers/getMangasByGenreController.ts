import { mangaRespository } from "../../main/repositories";
import { validatePage } from "../utils";
import { GetMangasByGenreController } from "../../infra/controllers";
import { GetMangasByGenreUseCase } from "../../application/useCases";

const getMangasByGenreUseCase = new GetMangasByGenreUseCase(mangaRespository);
const getMangasByGenreController = new GetMangasByGenreController(
  getMangasByGenreUseCase,
  validatePage
);

export { getMangasByGenreController };
