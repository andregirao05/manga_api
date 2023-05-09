import { mangaRespository } from "../../repositories";
import { GetMangaController } from "./GetMangaController";
import { GetMangaUseCase } from "./GetMangaUseCase";
import { validateId } from "../validateId";

const getMangaUseCase = new GetMangaUseCase(mangaRespository);
const getMangaController = new GetMangaController(getMangaUseCase, validateId);

export { getMangaController };
