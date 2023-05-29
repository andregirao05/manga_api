import { mangaRespository } from "../../repositories";
import { GetPopularMangasUseCase } from "./GetPopularMangasUseCase";
import { GetPopularMangasController } from "./GetPopularMangasController";

const getPopularMangasUseCase = new GetPopularMangasUseCase(mangaRespository);
const getPopularMangasController = new GetPopularMangasController(
  getPopularMangasUseCase
);

export { getPopularMangasController };
export * from "./IGetPopularMangasDTO";
