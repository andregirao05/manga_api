import { mangaRespository } from "../repositories";
import { GetChaptersUseCase } from "../../application/useCases";
import { GetChaptersController } from "../../infra/controllers";
import { validateId } from "../utils";

const getChaptersUseCase = new GetChaptersUseCase(mangaRespository);
const getChaptersController = new GetChaptersController(
  getChaptersUseCase,
  validateId
);

export { getChaptersController };
