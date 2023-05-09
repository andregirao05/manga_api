import { acceptedOrigins } from "../../main/configs";
import { mangaRespository } from "../../repositories";
import { SearchMangasController } from "./SearchMangasController";
import { SearchMangasUseCase } from "./SearchMangasUseCase";

const searchMangasUseCase = new SearchMangasUseCase(mangaRespository)
const searchMangasController = new SearchMangasController(searchMangasUseCase, acceptedOrigins)

export { searchMangasController }