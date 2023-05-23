import { acceptedOrigins } from "../configs";
import { mangaRespository } from "../repositories";
import { validatePage } from "../utils/validatePage";
import { GetLatestUpdatedMangasController } from "../../infra/controllers";
import { GetLatestUpdatedMangasUseCase } from "../../application/useCases";

const getLatestUpdatedMangasUseCase = new GetLatestUpdatedMangasUseCase(
  mangaRespository
);
const getLatestUpdatedMangasController = new GetLatestUpdatedMangasController(
  getLatestUpdatedMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { getLatestUpdatedMangasController };
