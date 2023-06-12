import { mangaRespository } from "repositories";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";
import { GetLatestUpdatedMangasController } from "./GetLatestUpdatedMangasController";
import { Validator } from "validation";
import { IGetLatestUpdatedMangasDTO } from "./IGetLatestUpdatedMangasDTO";
import { getLatestUpdatedMangasSchema } from "./getLatestUpdatedMangasSchema";

const getLatestUpdatedMangasUseCase = new GetLatestUpdatedMangasUseCase(
  mangaRespository
);

const getLatestUpdatedMangasValidator =
  new Validator<IGetLatestUpdatedMangasDTO>(getLatestUpdatedMangasSchema);

const getLatestUpdatedMangasController = new GetLatestUpdatedMangasController(
  getLatestUpdatedMangasUseCase,
  getLatestUpdatedMangasValidator
);

export { getLatestUpdatedMangasController };
export * from "./IGetLatestUpdatedMangasDTO";
