import { acceptedOrigins } from "../../configs";
import { mangaRespository } from "../../repositories";
import { validatePage } from "../validatePage";
import { GetLatestUpdatedMangasController } from "./GetLatestUpdatedMangasController";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";

const getLatestUpdatedMangasUseCase = new GetLatestUpdatedMangasUseCase(
  mangaRespository
);
const getLatestUpdatedMangasController = new GetLatestUpdatedMangasController(
  getLatestUpdatedMangasUseCase,
  acceptedOrigins,
  validatePage
);

export { getLatestUpdatedMangasController };
