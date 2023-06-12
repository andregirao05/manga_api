import { mangaRespository } from "repositories";
import { SearchMangasUseCase } from "./SearchMangasUseCase";
import { SearchMangasController } from "./SearchMangasController";
import { Validator } from "validation";
import { ISearchMangasDTO } from "./ISearchMangasDTO";
import { searchMangasSchema } from "./searchMangasSchema";

const searchMangasUseCase = new SearchMangasUseCase(mangaRespository);
const searchMangasValidator = new Validator<ISearchMangasDTO>(
  searchMangasSchema
);
const searchMangasController = new SearchMangasController(
  searchMangasUseCase,
  searchMangasValidator
);

export { searchMangasController };
export * from "./ISearchMangasDTO";
