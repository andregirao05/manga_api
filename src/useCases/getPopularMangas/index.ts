import { acceptedOrigins } from "../../configs";
import { mangaRespository } from "../../repositories";
import { validatePage } from "../validatePage";
import { GetPopularMangasController } from "./GetPopularMangasController";
import { GetPopularMangasUseCase } from "./GetPopulatMangasUseCase";

const getPopularMangasUseCase = new GetPopularMangasUseCase(mangaRespository);
const getPopularMangasController = new GetPopularMangasController(
  getPopularMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { getPopularMangasController };
