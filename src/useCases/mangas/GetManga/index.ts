import { mangaRespository } from "repositories";
import { GetMangaUseCase } from "./GetMangaUseCase";
import { GetMangaController } from "./GetMangaController";
import { Validator } from "validation";
import { IGetMangaDTO } from "./IGetMangaDTO";
import { getMangaSchema } from "./getMangaSchema";

const getMangaUseCase = new GetMangaUseCase(mangaRespository);
const getMangaValidator = new Validator<IGetMangaDTO>(getMangaSchema);
const getMangaController = new GetMangaController(
  getMangaUseCase,
  getMangaValidator
);

export { getMangaController };
export * from "./IGetMangaDTO";
