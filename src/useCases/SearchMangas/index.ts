import { mangaRespository } from "../../repositories";
import { SearchMangasUseCase } from "./SearchMangasUseCase";
import { SearchMangasController } from "./SearchMangasController";

const searchMangasUseCase = new SearchMangasUseCase(mangaRespository);
const searchMangasController = new SearchMangasController(searchMangasUseCase);

export { searchMangasController };
export * from "./ISearchMangasDTO";
