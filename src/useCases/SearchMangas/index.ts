import { acceptedOrigins } from "../../configs";
import { mangaRespository } from "../../repositories";
import { SearchMangasUseCase } from "./SearchMangasUseCase";
import { SearchMangasController } from "./SearchMangasController";
import { validatePage } from "../../validate";

const searchMangasUseCase = new SearchMangasUseCase(mangaRespository);
const searchMangasController = new SearchMangasController(
  searchMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { searchMangasController };
export * from "./ISearchMangasDTO";
