import { AddMangaUseCase } from "./AddMangaUseCase";
import { AddMangaController } from "./AddMangaController";
import { mangaRespository } from "../../repositories";

const addMangaUseCase = new AddMangaUseCase(mangaRespository);
const addMangaController = new AddMangaController(addMangaUseCase);

export * from "./IAddMangaDTO";
export { addMangaController };
