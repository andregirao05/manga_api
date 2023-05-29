import { mangaRespository } from "../../repositories";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";
import { GetLatestUpdatedMangasController } from "./GetLatestUpdatedMangasController";

const getLatestUpdatedMangasUseCase = new GetLatestUpdatedMangasUseCase(
  mangaRespository
);
const getLatestUpdatedMangasController = new GetLatestUpdatedMangasController(
  getLatestUpdatedMangasUseCase
);

export { getLatestUpdatedMangasController };
export * from "./IGetLatestUpdatedMangasDTO";
