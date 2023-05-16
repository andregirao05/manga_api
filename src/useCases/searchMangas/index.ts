import { acceptedOrigins } from "../../configs";
import { mangaRespository } from "../../repositories";
import { validatePage } from "../validatePage";
import { SearchMangasController } from "./SearchMangasController";
import { SearchMangasUseCase } from "./SearchMangasUseCase";

const searchMangasUseCase = new SearchMangasUseCase(mangaRespository);
const searchMangasController = new SearchMangasController(
  searchMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { searchMangasController };
