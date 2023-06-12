import { mangaRespository } from "repositories";
import { GetMangasByGenreUseCase } from "./GetMangasByGenreUseCase";
import { GetMangasByGenreController } from "./GetMangasByGenreController";
import { Validator } from "validation";
import { getMangasByGenreSchema } from "./getMangasuByGenreSchema";
import { IGetMangasByGenreDTO } from "./IGetMangasByGenreDTO";

const getMangasByGenreUseCase = new GetMangasByGenreUseCase(mangaRespository);
const getMangasByGenreValidator = new Validator<IGetMangasByGenreDTO>(
  getMangasByGenreSchema
);

const getMangasByGenreController = new GetMangasByGenreController(
  getMangasByGenreUseCase,
  getMangasByGenreValidator
);

export { getMangasByGenreController };
export * from "./IGetMangasByGenreDTO";
