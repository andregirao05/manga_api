import { acceptedOrigins } from "../configs";
import { mangaRespository } from "../repositories";
import { validatePage } from "../utils";
import { GetPopularMangasController } from "../../infra/controllers";
import { GetPopularMangasUseCase } from "../../application/useCases";

const getPopularMangasUseCase = new GetPopularMangasUseCase(mangaRespository);
const getPopularMangasController = new GetPopularMangasController(
  getPopularMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { getPopularMangasController };
