import { AddMangaUseCase } from "../../application/useCases";
import { AddMangaController } from "../../infra/controllers";
import { mangaRespository } from "../repositories";

const addMangaUseCase = new AddMangaUseCase(mangaRespository);
const addMangaController = new AddMangaController(addMangaUseCase);

export { addMangaController };
