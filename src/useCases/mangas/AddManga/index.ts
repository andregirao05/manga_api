import { AddMangaUseCase } from "./AddMangaUseCase";
import { AddMangaController } from "./AddMangaController";
import { mangaRespository } from "repositories";
import { Validator } from "validation";
import { IAddMangaDTO } from "./IAddMangaDTO";
import { addMangaSchema } from "./addMangaSchema";

const addMangaUseCase = new AddMangaUseCase(mangaRespository);
const addMangaValidator = new Validator<IAddMangaDTO>(addMangaSchema);
const addMangaController = new AddMangaController(
  addMangaUseCase,
  addMangaValidator
);

export * from "./IAddMangaDTO";
export { addMangaController };
