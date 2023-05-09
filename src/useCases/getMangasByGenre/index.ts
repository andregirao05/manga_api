import { mangaRespository } from "../../repositories";
import { GetMangasByGenreController } from "./GetMangasByGenreController";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";

const getMangasByGenreUseCase = new GetMangasByGenreUseCase(mangaRespository)
const getMangasByGenreController = new GetMangasByGenreController(getMangasByGenreUseCase)

export { getMangasByGenreController }