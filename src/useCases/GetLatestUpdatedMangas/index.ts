import { acceptedOrigins } from "../../configs";
import { mangaRespository } from "../../repositories";
import { validatePage } from "../../validate";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";
import { GetLatestUpdatedMangasController } from "./GetLatestUpdatedMangasController";

const getLatestUpdatedMangasUseCase = new GetLatestUpdatedMangasUseCase(
  mangaRespository
);
const getLatestUpdatedMangasController = new GetLatestUpdatedMangasController(
  getLatestUpdatedMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { getLatestUpdatedMangasController };
export * from "./IGetLatestUpdatedMangasDTO";
