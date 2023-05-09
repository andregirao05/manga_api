import { acceptedOrigins } from "../../main/configs";
import { mangaRespository } from "../../repositories";
import { GetLatestUpdatedMangasController } from "./GetLatestUpdatedMangasController";
import { GetLatestUpdatedMangasUseCase } from "./GetLatestUpdatedMangasUseCase";

const getLatestUpdatedMangasUseCase = new GetLatestUpdatedMangasUseCase(mangaRespository)
const getLatestUpdatedMangasController = new GetLatestUpdatedMangasController(getLatestUpdatedMangasUseCase, acceptedOrigins)

export { getLatestUpdatedMangasController }