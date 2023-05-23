import { GetMangaUseCase } from "../../application/useCases";
import { GetMangaController } from "../../infra/controllers";
import { mangaRespository } from "../repositories";
import { validateId } from "../utils";

const getMangaUseCase = new GetMangaUseCase(mangaRespository);
const getMangaController = new GetMangaController(getMangaUseCase, validateId);

export { getMangaController };
