import { mangaRespository } from "repositories";
import { GetPopularMangasUseCase } from "./GetPopularMangasUseCase";
import { GetPopularMangasController } from "./GetPopularMangasController";
import { Validator } from "validation";
import { IGetPopularMangasDTO } from "./IGetPopularMangasDTO";
import { getPopularMangasSchema } from "./getPopularMangasSchema";

const getPopularMangasUseCase = new GetPopularMangasUseCase(mangaRespository);

const getPopularMangasValidator = new Validator<IGetPopularMangasDTO>(
  getPopularMangasSchema
);

const getPopularMangasController = new GetPopularMangasController(
  getPopularMangasUseCase,
  getPopularMangasValidator
);

export { getPopularMangasController };
export * from "./IGetPopularMangasDTO";
