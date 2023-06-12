import { mangaRespository } from "repositories";
import { MangaExistsController } from "./MangaExistsController";
import { MangaExistsUseCase } from "./MangaExistsUseCase";
import { Validator } from "validation";
import { IMangaExistsDTO } from "./IMangaExistsDTO";
import { mangaExistsSchema } from "./mangaExistsSchema";

const mangaExistsUseCase = new MangaExistsUseCase(mangaRespository);
const mangaExistsValidator = new Validator<IMangaExistsDTO>(mangaExistsSchema);
const mangaExistsController = new MangaExistsController(
  mangaExistsUseCase,
  mangaExistsValidator
);

export { mangaExistsController };
export * from "./IMangaExistsDTO";
