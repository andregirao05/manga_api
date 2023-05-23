import { acceptedOrigins } from "../configs";
import { mangaRespository } from "../repositories";
import { validatePage } from "../utils";
import { SearchMangasController } from "../../infra/controllers";
import { SearchMangasUseCase } from "../../application/useCases";

const searchMangasUseCase = new SearchMangasUseCase(mangaRespository);
const searchMangasController = new SearchMangasController(
  searchMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { searchMangasController };
