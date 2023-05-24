import { acceptedOrigins } from "../../configs";
import { mangaRespository } from "../../repositories";
import { GetPopularMangasUseCase } from "./GetPopularMangasUseCase";
import { GetPopularMangasController } from "./GetPopularMangasController";
import { validatePage } from "../../validate";

const getPopularMangasUseCase = new GetPopularMangasUseCase(mangaRespository);
const getPopularMangasController = new GetPopularMangasController(
  getPopularMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { getPopularMangasController };
export * from "./IGetPopularMangasDTO";
