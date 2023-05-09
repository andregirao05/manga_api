import { acceptedOrigins } from "../../main/configs";
import { mangaRespository } from "../../repositories";
import { GetPopularMangasController } from "./GetPopularMangasController";
import { GetPopularMangasUseCase } from "./GetPopulatMangasUseCase";

const getPopularMangasUseCase = new GetPopularMangasUseCase(mangaRespository)
const getPopularMangasController =  new GetPopularMangasController(getPopularMangasUseCase, acceptedOrigins)

export { getPopularMangasController }